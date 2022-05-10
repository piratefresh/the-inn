import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CampaignUpdateWithoutPlayersInput } from "../inputs/CampaignUpdateWithoutPlayersInput";
import { CampaignWhereUniqueInput } from "../inputs/CampaignWhereUniqueInput";

@TypeGraphQL.InputType("CampaignUpdateWithWhereUniqueWithoutPlayersInput", {
  isAbstract: true
})
export class CampaignUpdateWithWhereUniqueWithoutPlayersInput {
  @TypeGraphQL.Field(_type => CampaignWhereUniqueInput, {
    nullable: false
  })
  where!: CampaignWhereUniqueInput;

  @TypeGraphQL.Field(_type => CampaignUpdateWithoutPlayersInput, {
    nullable: false
  })
  data!: CampaignUpdateWithoutPlayersInput;
}
