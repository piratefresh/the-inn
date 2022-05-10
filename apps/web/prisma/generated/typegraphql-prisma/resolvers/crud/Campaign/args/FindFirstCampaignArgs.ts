import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CampaignOrderByWithRelationInput } from "../../../inputs/CampaignOrderByWithRelationInput";
import { CampaignWhereInput } from "../../../inputs/CampaignWhereInput";
import { CampaignWhereUniqueInput } from "../../../inputs/CampaignWhereUniqueInput";
import { CampaignScalarFieldEnum } from "../../../../enums/CampaignScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstCampaignArgs {
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

  @TypeGraphQL.Field(_type => [CampaignScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "createdAt" | "updatedAt" | "gmId" | "summary" | "additional_details" | "note" | "image" | "isOnline" | "city" | "state" | "lat" | "lng" | "geolocation_lat" | "geolocation_lng" | "startDate" | "endDate" | "days" | "time_periods" | "game_system" | "experiance" | "voip_system" | "max_seats" | "puzzles" | "combat" | "roleplay" | "tags" | "price"> | undefined;
}
