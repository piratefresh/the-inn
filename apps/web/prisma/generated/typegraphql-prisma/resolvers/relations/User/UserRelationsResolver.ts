import * as TypeGraphQL from "type-graphql";
import { Account } from "../../../models/Account";
import { Campaign } from "../../../models/Campaign";
import { Review } from "../../../models/Review";
import { Session } from "../../../models/Session";
import { User } from "../../../models/User";
import { UserAccountsArgs } from "./args/UserAccountsArgs";
import { UserCampaignArgs } from "./args/UserCampaignArgs";
import { UserHostedArgs } from "./args/UserHostedArgs";
import { UserReviewsArgs } from "./args/UserReviewsArgs";
import { UserSessionsArgs } from "./args/UserSessionsArgs";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => User)
export class UserRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => [Account], {
    nullable: false
  })
  async accounts(@TypeGraphQL.Root() user: User, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UserAccountsArgs): Promise<Account[]> {
    return getPrismaFromContext(ctx).user.findUnique({
      where: {
        id: user.id,
      },
    }).accounts(args);
  }

  @TypeGraphQL.FieldResolver(_type => [Session], {
    nullable: false
  })
  async sessions(@TypeGraphQL.Root() user: User, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UserSessionsArgs): Promise<Session[]> {
    return getPrismaFromContext(ctx).user.findUnique({
      where: {
        id: user.id,
      },
    }).sessions(args);
  }

  @TypeGraphQL.FieldResolver(_type => [Review], {
    nullable: false
  })
  async reviews(@TypeGraphQL.Root() user: User, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UserReviewsArgs): Promise<Review[]> {
    return getPrismaFromContext(ctx).user.findUnique({
      where: {
        id: user.id,
      },
    }).reviews(args);
  }

  @TypeGraphQL.FieldResolver(_type => [Campaign], {
    nullable: false
  })
  async Campaign(@TypeGraphQL.Root() user: User, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UserCampaignArgs): Promise<Campaign[]> {
    return getPrismaFromContext(ctx).user.findUnique({
      where: {
        id: user.id,
      },
    }).Campaign(args);
  }

  @TypeGraphQL.FieldResolver(_type => [Campaign], {
    nullable: false
  })
  async Hosted(@TypeGraphQL.Root() user: User, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UserHostedArgs): Promise<Campaign[]> {
    return getPrismaFromContext(ctx).user.findUnique({
      where: {
        id: user.id,
      },
    }).Hosted(args);
  }
}
