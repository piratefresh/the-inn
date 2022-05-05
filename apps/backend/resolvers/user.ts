import { User } from "api/models/User";
import { Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../types/MyContext";

@Resolver()
export class UserResolver {
  @Query((_type) => [User], { nullable: true })
  async users(@Ctx() { prisma }: MyContext) {
    return prisma.user.findMany();
  }

  @Mutation((_type) => User)
  async signup(@Ctx() { prisma }: MyContext) {
    const password = await bcrypt.hash(args.password, 10);

    const user = await context.prisma.createUser({ ...args, password });

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    context.response.cookie("token", token, {
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
