import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolFilter } from "../inputs/BoolFilter";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { EnumDifficultyFilter } from "../inputs/EnumDifficultyFilter";
import { EnumExperianceFilter } from "../inputs/EnumExperianceFilter";
import { FloatFilter } from "../inputs/FloatFilter";
import { FloatNullableFilter } from "../inputs/FloatNullableFilter";
import { IntFilter } from "../inputs/IntFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";
import { StringNullableListFilter } from "../inputs/StringNullableListFilter";
import { UserListRelationFilter } from "../inputs/UserListRelationFilter";
import { UserRelationFilter } from "../inputs/UserRelationFilter";

@TypeGraphQL.InputType("CampaignWhereInput", {
  isAbstract: true
})
export class CampaignWhereInput {
  @TypeGraphQL.Field(_type => [CampaignWhereInput], {
    nullable: true
  })
  AND?: CampaignWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [CampaignWhereInput], {
    nullable: true
  })
  OR?: CampaignWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [CampaignWhereInput], {
    nullable: true
  })
  NOT?: CampaignWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  createdAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  updatedAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  gmId?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  summary?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  additional_details?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  note?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  image?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => BoolFilter, {
    nullable: true
  })
  isOnline?: BoolFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  city?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  state?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => FloatFilter, {
    nullable: true
  })
  lat?: FloatFilter | undefined;

  @TypeGraphQL.Field(_type => FloatFilter, {
    nullable: true
  })
  lng?: FloatFilter | undefined;

  @TypeGraphQL.Field(_type => FloatNullableFilter, {
    nullable: true
  })
  geolocation_lat?: FloatNullableFilter | undefined;

  @TypeGraphQL.Field(_type => FloatNullableFilter, {
    nullable: true
  })
  geolocation_lng?: FloatNullableFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  startDate?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  endDate?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableListFilter, {
    nullable: true
  })
  days?: StringNullableListFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableListFilter, {
    nullable: true
  })
  time_periods?: StringNullableListFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  game_system?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => EnumExperianceFilter, {
    nullable: true
  })
  experiance?: EnumExperianceFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  voip_system?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  max_seats?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => EnumDifficultyFilter, {
    nullable: true
  })
  puzzles?: EnumDifficultyFilter | undefined;

  @TypeGraphQL.Field(_type => EnumDifficultyFilter, {
    nullable: true
  })
  combat?: EnumDifficultyFilter | undefined;

  @TypeGraphQL.Field(_type => EnumDifficultyFilter, {
    nullable: true
  })
  roleplay?: EnumDifficultyFilter | undefined;

  @TypeGraphQL.Field(_type => UserRelationFilter, {
    nullable: true
  })
  game_master?: UserRelationFilter | undefined;

  @TypeGraphQL.Field(_type => UserListRelationFilter, {
    nullable: true
  })
  players?: UserListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableListFilter, {
    nullable: true
  })
  tags?: StringNullableListFilter | undefined;

  @TypeGraphQL.Field(_type => FloatNullableFilter, {
    nullable: true
  })
  price?: FloatNullableFilter | undefined;
}
