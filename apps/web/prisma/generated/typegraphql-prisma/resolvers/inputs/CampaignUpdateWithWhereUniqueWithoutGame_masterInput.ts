import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CampaignUpdateWithoutGame_masterInput } from "../inputs/CampaignUpdateWithoutGame_masterInput";
import { CampaignWhereUniqueInput } from "../inputs/CampaignWhereUniqueInput";

@TypeGraphQL.InputType("CampaignUpdateWithWhereUniqueWithoutGame_masterInput", {
  isAbstract: true
})
export class CampaignUpdateWithWhereUniqueWithoutGame_masterInput {
  @TypeGraphQL.Field(_type => CampaignWhereUniqueInput, {
    nullable: false
  })
  where!: CampaignWhereUniqueInput;

  @TypeGraphQL.Field(_type => CampaignUpdateWithoutGame_masterInput, {
    nullable: false
  })
  data!: CampaignUpdateWithoutGame_masterInput;
}
