import * as TypeGraphQL from "type-graphql";
import { Campaign } from "../../../models/Campaign";
import { User } from "../../../models/User";
import { CampaignPlayersArgs } from "./args/CampaignPlayersArgs";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Campaign)
export class CampaignRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => User, {
    nullable: false
  })
  async game_master(@TypeGraphQL.Root() campaign: Campaign, @TypeGraphQL.Ctx() ctx: any): Promise<User> {
    return getPrismaFromContext(ctx).campaign.findUnique({
      where: {
        id: campaign.id,
      },
    }).game_master({});
  }

  @TypeGraphQL.FieldResolver(_type => [User], {
    nullable: false
  })
  async players(@TypeGraphQL.Root() campaign: Campaign, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CampaignPlayersArgs): Promise<User[]> {
    return getPrismaFromContext(ctx).campaign.findUnique({
      where: {
        id: campaign.id,
      },
    }).players(args);
  }
}
