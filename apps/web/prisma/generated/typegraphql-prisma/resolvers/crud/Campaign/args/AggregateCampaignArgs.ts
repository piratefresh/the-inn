import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CampaignOrderByWithRelationInput } from "../../../inputs/CampaignOrderByWithRelationInput";
import { CampaignWhereInput } from "../../../inputs/CampaignWhereInput";
import { CampaignWhereUniqueInput } from "../../../inputs/CampaignWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregateCampaignArgs {
  @TypeGraphQL.Field(_type => CampaignWhereInput, {
    nullable: true
  })
  where?: CampaignWhereInput | undefined;

  @TypeGraphQL.Field(_type => [CampaignOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: CampaignOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => CampaignWhereUniqueInput, {
    nullable: true
  })
  cursor?: CampaignWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
