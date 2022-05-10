import * as TypeGraphQL from "type-graphql";
import { Review } from "../../../models/Review";
import { User } from "../../../models/User";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Review)
export class ReviewRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => User, {
    nullable: false
  })
  async user(@TypeGraphQL.Root() review: Review, @TypeGraphQL.Ctx() ctx: any): Promise<User> {
    return getPrismaFromContext(ctx).review.findUnique({
      where: {
        id: review.id,
      },
    }).user({});
  }
}
