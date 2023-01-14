import {
  Arg,
  Args,
  ArgsType,
  createUnionType,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
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
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { EdgeType } from "typegraphql-relay-connections";
import { PageInfo } from "@typedefs/relay/PageInfo";
import { v4 as uuidv4 } from "uuid";

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

@ArgsType()
export class PaginationArgs {
  @Field((type) => Int, { nullable: true })
  skip?: number;
  @Field({ nullable: true })
  after?: string;
  @Field({ nullable: true })
  before?: string;
  @Field((type) => Int, { nullable: true })
  first?: number;
  @Field((type) => Int, { nullable: true })
  last?: number;
}

@InputType()
export class UpdateProfileArgs {
  @Field({ nullable: true })
  firstName?: string;
  @Field({ nullable: true })
  lastName?: string;
  @Field({ nullable: true })
  imageUrl?: string;
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  aboutMe?: string;
  @Field({ nullable: true })
  htmlAboutMe?: string;
  @Field({ nullable: true })
  playStyle?: string;
  @Field({ nullable: true })
  htmlPlayStyle?: string;
  @Field({ nullable: true })
  gmStyle?: string;
  @Field({ nullable: true })
  htmlGmStyle?: string;
  @Field({ nullable: true })
  facebook?: string;
  @Field({ nullable: true })
  discord?: string;
  @Field({ nullable: true })
  twitch?: string;
  @Field({ nullable: true })
  twitter?: string;
  @Field({ nullable: true })
  youtube?: string;
  @Field({ nullable: true })
  instagram?: string;
  @Field(() => [String], { nullable: true })
  tags: string[];
}
@InputType()
export class UpdatePasswordArgs {
  @Field({ nullable: true })
  oldPassword?: string;
  @Field({ nullable: true })
  newPassword?: string;
}

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

@ObjectType()
export class UserEdge extends EdgeType(User) {}

@ObjectType()
export class UserConnection {
  @Field((type) => [UserEdge])
  edges: UserEdge[];
  @Field((type) => PageInfo)
  pageInfo: PageInfo;
  @Field((type) => Int)
  totalCount: number;
}

@Resolver()
export class UserResolver {
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

    return `hello world ${authResponse}`;
  }
  @Query(() => String)
  async me(@Ctx() { req }: MyContext) {
    return req.session.userId;
  }
  @Query(() => UserConnection)
  async getUsers(
    @Ctx() { prisma }: MyContext,
    @Args() { skip, after, before, first, last }: PaginationArgs
  ) {
    const result = await findManyCursorConnection(
      (args) =>
        prisma.user.findMany({
          ...args,
          include: {
            hosted: true,
            memberships: true,
            reviews: true,
          },
        }),
      () => prisma.user.count(),
      { first, after }
    );

    return result;
  }
  @Query(() => [User])
  async getOnlineUsers(
    @Ctx() { prisma, pusher }: MyContext,
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
      include: {
        memberships: true,
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
      let user = await prisma.user.findUnique({
        where: {
          email: usernameOrEmail,
        },
        include: {
          accounts: true,
        },
      });

      const refreshToken = createRefreshToken(user);
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);

      await prisma.account.upsert({
        where: {
          provider_providerAccountId: {
            provider: "Credentials",
            providerAccountId: user.id,
          },
        },
        create: {
          userId: user.id,
          type: "credentials",
          provider: "Credentials",
          providerAccountId: user.id,
        },
        update: {
          refresh_token: refreshToken,
          expires_at: (decoded as JWTPayload).accessTokenExpires,
        },
      });

      if (!user) return new NonExistingUserError();

      const authenticated = await argon2.verify(user.password, password);

      if (!authenticated) return new BadCredentialsError();

      // Refetch user without password
      const userSnippet = await prisma.user.findUnique({
        where: {
          email: usernameOrEmail,
        },
        select: {
          email: true,
          firstName: true,
          lastName: true,
          id: true,
          imageUrl: true,
        },
      });

      // setToken(user, res);

      req.session.userId = user.id;

      return Object.assign(new User(), userSnippet);
    } catch (err) {
      console.log("err: ", err);
    }
  }
  @Mutation((_type) => Boolean)
  async setSessionSocial(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Ctx() { prisma, res, req }: MyContext
  ) {
    // const inputUserEmailErrors = await validate(usernameOrEmail);
    // if (inputUserEmailErrors.length > 0)
    //   return FieldsValidationError.from(inputUserEmailErrors);
    // const inputPassword = await validate(password);
    // if (inputPassword.length > 0)
    //   return FieldsValidationError.from(inputPassword);
    try {
      let user = await prisma.user.findUnique({
        where: {
          email: usernameOrEmail,
        },
        include: {
          accounts: true,
          sessions: true,
        },
      });

      if (!user) return new NonExistingUserError();

      setToken(user, res);

      req.session.userId = user.id;

      return true;
    } catch (err) {
      console.log("err: ", err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  signout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        console.log("SIGNING OUT");
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

  @Mutation(() => User)
  async updateUserProfile(
    @Arg("updateProfileArgs", { nullable: true })
    updateProfileArgs: UpdateProfileArgs,
    @Ctx() { prisma, req }: MyContext
  ) {
    const userId = req.session.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    console.log(user.email);

    // remove email field so prisma dosen't throw unique error
    if (user.email === updateProfileArgs.email) {
      delete updateProfileArgs.email;

      console.log("updateProfileArgs: ", updateProfileArgs);
    }

    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...updateProfileArgs,
      },
    });
  }

  @Mutation(() => User)
  async updateUserPassword(
    @Arg("updatePasswordArgs", { nullable: true })
    updatePasswordArgs: UpdatePasswordArgs,
    @Ctx() { prisma, req }: MyContext
  ) {
    const userId = req.session.userId;

    console.log("req.session: ", req.session);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (updatePasswordArgs.oldPassword) {
      const verifyOldPassword = await argon2.verify(
        user.password,
        updatePasswordArgs.oldPassword
      );
      if (verifyOldPassword) {
        return await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            password: updatePasswordArgs.newPassword,
          },
        });
      } else {
        throw "Old password is wrong";
      }
    }
  }
}
