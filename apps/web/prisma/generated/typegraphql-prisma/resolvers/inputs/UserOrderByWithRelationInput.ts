import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AccountOrderByRelationAggregateInput } from "../inputs/AccountOrderByRelationAggregateInput";
import { CampaignOrderByRelationAggregateInput } from "../inputs/CampaignOrderByRelationAggregateInput";
import { ReviewOrderByRelationAggregateInput } from "../inputs/ReviewOrderByRelationAggregateInput";
import { SessionOrderByRelationAggregateInput } from "../inputs/SessionOrderByRelationAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("UserOrderByWithRelationInput", {
  isAbstract: true
})
export class UserOrderByWithRelationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  createdAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  updatedAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  email?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  emailVerified?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  image?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  experience?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  twitter?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  facebook?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  discord?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  youtube?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  status?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => AccountOrderByRelationAggregateInput, {
    nullable: true
  })
  accounts?: AccountOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field(_type => SessionOrderByRelationAggregateInput, {
    nullable: true
  })
  sessions?: SessionOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ReviewOrderByRelationAggregateInput, {
    nullable: true
  })
  reviews?: ReviewOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field(_type => CampaignOrderByRelationAggregateInput, {
    nullable: true
  })
  Campaign?: CampaignOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field(_type => CampaignOrderByRelationAggregateInput, {
    nullable: true
  })
  Hosted?: CampaignOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  campaignId?: "asc" | "desc" | undefined;
}
