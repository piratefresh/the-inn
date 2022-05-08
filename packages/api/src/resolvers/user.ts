import { Ctx, Field, InputType, Query, Resolver } from "type-graphql";
import { MyContext, User } from "..";

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
}
