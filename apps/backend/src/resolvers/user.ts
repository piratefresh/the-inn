import {
  Arg,
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

  @Mutation((_type) => User)
  async signup(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { prisma, res }: MyContext
  ) {
    const hashedPassword = await argon2.hash(options.password);
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

    const token = jwt.sign({ userId: createdUser.id }, "keyboard cat");

    res.cookie("rid", token, {
      httpOnly: false,
      // secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie,
      domain:
        process.env.NODE_ENV === "development"
          ? "http://localhost:4000"
          : "https://the-inn-graphql.vercel.app",
    });
    return {
      token,
      ...createdUser,
    };
  }
}
