import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AccountListRelationFilter } from "../inputs/AccountListRelationFilter";
import { CampaignListRelationFilter } from "../inputs/CampaignListRelationFilter";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { DateTimeNullableFilter } from "../inputs/DateTimeNullableFilter";
import { EnumStatusTypeFilter } from "../inputs/EnumStatusTypeFilter";
import { ReviewListRelationFilter } from "../inputs/ReviewListRelationFilter";
import { SessionListRelationFilter } from "../inputs/SessionListRelationFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";

@TypeGraphQL.InputType("UserWhereInput", {
  isAbstract: true
})
export class UserWhereInput {
  @TypeGraphQL.Field(_type => [UserWhereInput], {
    nullable: true
  })
  AND?: UserWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserWhereInput], {
    nullable: true
  })
  OR?: UserWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserWhereInput], {
    nullable: true
  })
  NOT?: UserWhereInput[] | undefined;

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

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  email?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeNullableFilter, {
    nullable: true
  })
  emailVerified?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  image?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  name?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  experience?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  twitter?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  facebook?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  discord?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  youtube?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => EnumStatusTypeFilter, {
    nullable: true
  })
  status?: EnumStatusTypeFilter | undefined;

  @TypeGraphQL.Field(_type => AccountListRelationFilter, {
    nullable: true
  })
  accounts?: AccountListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => SessionListRelationFilter, {
    nullable: true
  })
  sessions?: SessionListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => ReviewListRelationFilter, {
    nullable: true
  })
  reviews?: ReviewListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => CampaignListRelationFilter, {
    nullable: true
  })
  Campaign?: CampaignListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => CampaignListRelationFilter, {
    nullable: true
  })
  Hosted?: CampaignListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  campaignId?: StringNullableFilter | undefined;
}
