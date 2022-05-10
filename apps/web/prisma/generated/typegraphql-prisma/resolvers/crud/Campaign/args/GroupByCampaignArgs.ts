import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CampaignOrderByWithAggregationInput } from "../../../inputs/CampaignOrderByWithAggregationInput";
import { CampaignScalarWhereWithAggregatesInput } from "../../../inputs/CampaignScalarWhereWithAggregatesInput";
import { CampaignWhereInput } from "../../../inputs/CampaignWhereInput";
import { CampaignScalarFieldEnum } from "../../../../enums/CampaignScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByCampaignArgs {
  @TypeGraphQL.Field(_type => CampaignWhereInput, {
    nullable: true
  })
  where?: CampaignWhereInput | undefined;

  @TypeGraphQL.Field(_type => [CampaignOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: CampaignOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [CampaignScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "createdAt" | "updatedAt" | "gmId" | "summary" | "additional_details" | "note" | "image" | "isOnline" | "city" | "state" | "lat" | "lng" | "geolocation_lat" | "geolocation_lng" | "startDate" | "endDate" | "days" | "time_periods" | "game_system" | "experiance" | "voip_system" | "max_seats" | "puzzles" | "combat" | "roleplay" | "tags" | "price">;

  @TypeGraphQL.Field(_type => CampaignScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: CampaignScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
