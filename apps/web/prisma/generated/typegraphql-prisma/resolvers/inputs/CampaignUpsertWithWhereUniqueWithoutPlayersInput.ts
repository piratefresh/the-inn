import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CampaignCreateWithoutPlayersInput } from "../inputs/CampaignCreateWithoutPlayersInput";
import { CampaignUpdateWithoutPlayersInput } from "../inputs/CampaignUpdateWithoutPlayersInput";
import { CampaignWhereUniqueInput } from "../inputs/CampaignWhereUniqueInput";

@TypeGraphQL.InputType("CampaignUpsertWithWhereUniqueWithoutPlayersInput", {
  isAbstract: true
})
export class CampaignUpsertWithWhereUniqueWithoutPlayersInput {
  @TypeGraphQL.Field(_type => CampaignWhereUniqueInput, {
    nullable: false
  })
  where!: CampaignWhereUniqueInput;

  @TypeGraphQL.Field(_type => CampaignUpdateWithoutPlayersInput, {
    nullable: false
  })
  update!: CampaignUpdateWithoutPlayersInput;

  @TypeGraphQL.Field(_type => CampaignCreateWithoutPlayersInput, {
    nullable: false
  })
  create!: CampaignCreateWithoutPlayersInput;
}
