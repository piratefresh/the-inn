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
import jwt from "jsonwebtoken";
import { validate } from "class-validator";
import { setToken } from "@utils/setToken";
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

      return {
        ...createdUser,
      };
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
    const user = await prisma.user.findUnique({
      where: {
        email: usernameOrEmail,
      },
    });

    if (!user) return new NonExistingUserError();

    const authenticated = await argon2.verify(user.password, password);

    if (!authenticated) return new BadCredentialsError();

    setToken(user, res);

    req.session.userId = user.id;

    return {
      ...user,
    };
  }
}
