import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
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
  @Query(() => String)
  async helloworld() {
    return "hello world";
  }
  @Query(() => [User])
  async getUsers(@Ctx() { prisma, res }: MyContext) {
    return prisma.user.findMany({});
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
  @Query(() => [User])
  async getUser(@Ctx() { prisma, res }: MyContext) {
    return prisma.user.findFirst({});
  }

  @Mutation((_type) => CreateUserResult)
  async signup(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { prisma, res }: MyContext
  ) {
    const errors = await validate(options);
    if (errors.length > 0) return FieldsValidationError.from(errors);
    const hashedPassword = await argon2.hash(options.password);

    try {
      const createdUser = await prisma.user.create({
        data: {
          ...options,
          experience: "Beginner",
          password: hashedPassword,
        },
      });

      await prisma.account.create({
        data: {
          userId: createdUser.id,
          type: "credentials",
          provider: "Credentials",
          providerAccountId: createdUser.id,
        },
      });

      setToken(createdUser, res);

      console.log("user: ", createdUser);

      return Object.assign(new User(), createdUser);
    } catch (err) {
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

    console.log("SIGN IN: ");

    const user = await prisma.user.findUnique({
      where: {
        email: usernameOrEmail,
      },
      include: {
        accounts: true,
      },
    });

    console.log("user: ", user);

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

    setToken(user, res);

    req.session.userId = user.id;
    req.session.save();

    console.log("sessionID SIGN UP: ", req.session.userId);

    return Object.assign(new User(), user);
  }
  @Mutation((_type) => AuthResult)
  async exchangeToken(
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
    console.log("sessionID EXCHNAGE TOKEN: ", req.session.userId);

    const user = await prisma.user.findUnique({
      where: {
        id: req.session.userId,
      },
      include: {
        accounts: true,
      },
    });

    return Object.assign(new User(), user);
  }
}
