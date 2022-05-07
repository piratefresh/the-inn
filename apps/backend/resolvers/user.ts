import { User } from "api/models/User";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { MyContext } from "../types/MyContext";

@InputType()
export class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  email: string;
}

@Resolver()
export class UserResolver {
  @Query((_type) => [User], { nullable: true })
  async users(@Ctx() { prisma }: MyContext) {
    return prisma.user.findMany();
  }

  // @Mutation((_type) => User)
  // async signup(
  //   @Arg("options") options: UsernamePasswordInput,
  //   @Ctx() { prisma, res }: MyContext
  // ) {
  //   const user = await prisma.user.create({ ...options, password: "test" });

  //   const token = jwt.sign({ userId: user.id }, APP_SECRET);

  //   res.cookie("token", token, {
  //     httpOnly: false,
  //     // secure: false,
  //     maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
  //   });
  //   return {
  //     token,
  //     user,
  //   };
  // }
}
