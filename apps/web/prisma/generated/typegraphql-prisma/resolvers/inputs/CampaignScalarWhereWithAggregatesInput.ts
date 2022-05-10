import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolWithAggregatesFilter } from "../inputs/BoolWithAggregatesFilter";
import { DateTimeWithAggregatesFilter } from "../inputs/DateTimeWithAggregatesFilter";
import { EnumDifficultyWithAggregatesFilter } from "../inputs/EnumDifficultyWithAggregatesFilter";
import { EnumExperianceWithAggregatesFilter } from "../inputs/EnumExperianceWithAggregatesFilter";
import { FloatNullableWithAggregatesFilter } from "../inputs/FloatNullableWithAggregatesFilter";
import { FloatWithAggregatesFilter } from "../inputs/FloatWithAggregatesFilter";
import { IntWithAggregatesFilter } from "../inputs/IntWithAggregatesFilter";
import { StringNullableListFilter } from "../inputs/StringNullableListFilter";
import { StringNullableWithAggregatesFilter } from "../inputs/StringNullableWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("CampaignScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class CampaignScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [CampaignScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: CampaignScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [CampaignScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: CampaignScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [CampaignScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: CampaignScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeWithAggregatesFilter, {
    nullable: true
  })
  createdAt?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeWithAggregatesFilter, {
    nullable: true
  })
  updatedAt?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  gmId?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  summary?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
    nullable: true
  })
  additional_details?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
    nullable: true
  })
  note?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  image?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => BoolWithAggregatesFilter, {
    nullable: true
  })
  isOnline?: BoolWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  city?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  state?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => FloatWithAggregatesFilter, {
    nullable: true
  })
  lat?: FloatWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => FloatWithAggregatesFilter, {
    nullable: true
  })
  lng?: FloatWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => FloatNullableWithAggregatesFilter, {
    nullable: true
  })
  geolocation_lat?: FloatNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => FloatNullableWithAggregatesFilter, {
    nullable: true
  })
  geolocation_lng?: FloatNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeWithAggregatesFilter, {
    nullable: true
  })
  startDate?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeWithAggregatesFilter, {
    nullable: true
  })
  endDate?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableListFilter, {
    nullable: true
  })
  days?: StringNullableListFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableListFilter, {
    nullable: true
  })
  time_periods?: StringNullableListFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  game_system?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => EnumExperianceWithAggregatesFilter, {
    nullable: true
  })
  experiance?: EnumExperianceWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
    nullable: true
  })
  voip_system?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => IntWithAggregatesFilter, {
    nullable: true
  })
  max_seats?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => EnumDifficultyWithAggregatesFilter, {
    nullable: true
  })
  puzzles?: EnumDifficultyWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => EnumDifficultyWithAggregatesFilter, {
    nullable: true
  })
  combat?: EnumDifficultyWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => EnumDifficultyWithAggregatesFilter, {
    nullable: true
  })
  roleplay?: EnumDifficultyWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableListFilter, {
    nullable: true
  })
  tags?: StringNullableListFilter | undefined;

  @TypeGraphQL.Field(_type => FloatNullableWithAggregatesFilter, {
    nullable: true
  })
  price?: FloatNullableWithAggregatesFilter | undefined;
}
