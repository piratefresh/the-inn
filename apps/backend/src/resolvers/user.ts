import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import argon2 from "argon2";
import { User } from "@models/User";
import { MyContext } from "@typedefs/MyContext";
import { validate } from "class-validator";
import jwt from "jsonwebtoken";
import { createRefreshToken, JWTPayload, setToken } from "@utils/setToken";
import { ExistingUserError } from "@errors/ExisitingUserError";
import { FieldsValidationError } from "@errors/FieldsValidationError";
import { BadCredentialsError } from "@errors/BadCredentialsError";
import { NonExistingUserError } from "@errors/NonUserExists";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { issueToken, sendConfirmationEmail } from "@utils/sendEmailUtils";

export const AuthResult = createUnionType({
  name: "AuthResult",
  types: () =>
    [
      User,
      FieldsValidationError,
      NonExistingUserError,
      BadCredentialsError,
    ] as const,
});

export const CreateUserResult = createUnionType({
  name: "CreateUserResult",
  types: () => [User, FieldsValidationError, ExistingUserError] as const,
});

@InputType()
export class UsernamePasswordInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  password: string;
  @Field()
  email: string;
}

@Resolver()
export class UserResolver {
  // @FieldResolver(() => String)
  // email(@Root() user: User, @Ctx() { req }: MyContext) {
  //   if (req.session.userId === user.id) {
  //     return user.email;
  //   }
  //   return "";
  // }
  @Query(() => String)
  async helloworld(@Ctx() { prisma, req, res, pusher }: MyContext) {
    // @ts-ignore
    pusher.trigger("my-channel", "my-event", {
      message: "hello world",
    });

    const userInfo = await prisma.user.findUnique({
      where: {
        id: req.session.userId,
      },
    });

    // Replace this with code to retrieve the actual user id and info
    const user = {
      // @ts-ignore
      id: req.session.userId,
      user_info: {
        ...userInfo,
      },
      watchlist: ["another_id_1", "another_id_2"],
    };

    const authResponse = pusher.authenticateUser(req.session.userId, user);

    console.log(authResponse);

    return `hello world ${authResponse}`;
  }
  @Query(() => [User])
  async getUsers(@Ctx() { prisma, res }: MyContext) {
    return prisma.user.findMany({});
  }
  @Query(() => [User])
  async getOnlineUsers(
    @Ctx() { prisma, res, req, pusher }: MyContext,
    @Arg("username") username: string,
    @Arg("message") message: string
  ) {
    pusher.trigger("presence-awesome", "message_sent", {
      username,
      message,
    });
    return prisma.user.findMany({});
  }
  @Subscription(() => String, {
    topics: "MESSAGES",
  })
  async subscription(@Ctx() ctx: any): Promise<any> {
    return "something";
  }
  @Query(() => [User])
  async getUsersById(
    @Arg("playerIds", () => [String]) playerIds: string[],
    @Ctx() { prisma, res }: MyContext
  ) {
    return prisma.user.findMany({
      where: {
        id: {
          in: playerIds,
        },
      },
    });
  }
  @Query(() => User)
  async getUser(@Arg("id") id: string, @Ctx() { prisma, res }: MyContext) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  @Mutation((_type) => CreateUserResult)
  async signup(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { prisma, res, req }: MyContext
  ) {
    const errors = await validate(options);
    if (errors.length > 0) return FieldsValidationError.from(errors);
    const hashedPassword = await argon2.hash(options.password);

    try {
      const user = await prisma.user.create({
        data: {
          ...options,
          experience: "Beginner",
          password: hashedPassword,
        },
      });

      await prisma.account.create({
        data: {
          userId: user.id,
          type: "credentials",
          provider: "Credentials",
          providerAccountId: user.id,
        },
      });

      const token = await issueToken(user.id, prisma);

      await sendConfirmationEmail(user.email, token);

      setToken(user, res);
      console.log("req session: ", req.session);
      req.session.userId = user.id;

      return Object.assign(new User(), user);
    } catch (err) {
      console.log("err: ", err);
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === "P2002" // unique constraint failed
      ) {
        return new ExistingUserError();
      } else {
        throw err;
      }
    }
  }
  @Mutation((_type) => AuthResult)
  async signin(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { prisma, res, req }: MyContext
  ) {
    // const inputUserEmailErrors = await validate(usernameOrEmail);
    // if (inputUserEmailErrors.length > 0)
    //   return FieldsValidationError.from(inputUserEmailErrors);
    // const inputPassword = await validate(password);
    // if (inputPassword.length > 0)
    //   return FieldsValidationError.from(inputPassword);
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: usernameOrEmail,
        },
        include: {
          accounts: true,
        },
      });

      const refreshToken = createRefreshToken(user);
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);

      await prisma.account.update({
        where: {
          provider_providerAccountId_userId: {
            userId: user.id,
            provider: "Credentials",
            providerAccountId: user.id,
          },
        },
        data: {
          refreshToken,
          expiresAt: (decoded as JWTPayload).accessTokenExpires,
        },
      });

      if (!user) return new NonExistingUserError();

      const authenticated = await argon2.verify(user.password, password);

      if (!authenticated) return new BadCredentialsError();

      console.log("user: ", user.id);
      console.log("authenticated: ", authenticated);

      setToken(user, res);

      // res.setHeader(process.env.JWT_COOKIE_NAME, user.id);
      console.log("req session: ", req.session);
      req.session.userId = await user.id;

      return Object.assign(new User(), user);
    } catch (err) {
      console.log("err: ", err);
    }
  }

  @Mutation(() => Boolean)
  signout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(process.env.JWT_COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
