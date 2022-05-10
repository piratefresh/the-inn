import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CampaignCreateWithoutGame_masterInput } from "../inputs/CampaignCreateWithoutGame_masterInput";
import { CampaignWhereUniqueInput } from "../inputs/CampaignWhereUniqueInput";

@TypeGraphQL.InputType("CampaignCreateOrConnectWithoutGame_masterInput", {
  isAbstract: true
})
export class CampaignCreateOrConnectWithoutGame_masterInput {
  @TypeGraphQL.Field(_type => CampaignWhereUniqueInput, {
    nullable: false
  })
  where!: CampaignWhereUniqueInput;

  @TypeGraphQL.Field(_type => CampaignCreateWithoutGame_masterInput, {
    nullable: false
  })
  create!: CampaignCreateWithoutGame_masterInput;
}
