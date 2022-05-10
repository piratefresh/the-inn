import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CampaignWhereInput } from "../inputs/CampaignWhereInput";

@TypeGraphQL.InputType("CampaignListRelationFilter", {
  isAbstract: true
})
export class CampaignListRelationFilter {
  @TypeGraphQL.Field(_type => CampaignWhereInput, {
    nullable: true
  })
  every?: CampaignWhereInput | undefined;

  @TypeGraphQL.Field(_type => CampaignWhereInput, {
    nullable: true
  })
  some?: CampaignWhereInput | undefined;

  @TypeGraphQL.Field(_type => CampaignWhereInput, {
    nullable: true
  })
  none?: CampaignWhereInput | undefined;
}
