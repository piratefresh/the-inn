import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CampaignCreateWithoutGame_masterInput } from "../inputs/CampaignCreateWithoutGame_masterInput";
import { CampaignUpdateWithoutGame_masterInput } from "../inputs/CampaignUpdateWithoutGame_masterInput";
import { CampaignWhereUniqueInput } from "../inputs/CampaignWhereUniqueInput";

@TypeGraphQL.InputType("CampaignUpsertWithWhereUniqueWithoutGame_masterInput", {
  isAbstract: true
})
export class CampaignUpsertWithWhereUniqueWithoutGame_masterInput {
  @TypeGraphQL.Field(_type => CampaignWhereUniqueInput, {
    nullable: false
  })
  where!: CampaignWhereUniqueInput;

  @TypeGraphQL.Field(_type => CampaignUpdateWithoutGame_masterInput, {
    nullable: false
  })
  update!: CampaignUpdateWithoutGame_masterInput;

  @TypeGraphQL.Field(_type => CampaignCreateWithoutGame_masterInput, {
    nullable: false
  })
  create!: CampaignCreateWithoutGame_masterInput;
}
