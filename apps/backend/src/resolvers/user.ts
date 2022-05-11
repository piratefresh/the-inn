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
  // @Field()
  // username: string;
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
    const user = await prisma.user.create({
      data: {
        ...options,
        experience: "Beginner",
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: user.id }, "keyboard cat");

    res.cookie("token", token, {
      httpOnly: false,
      // secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });
    return {
      token,
      user,
    };
  }
}
