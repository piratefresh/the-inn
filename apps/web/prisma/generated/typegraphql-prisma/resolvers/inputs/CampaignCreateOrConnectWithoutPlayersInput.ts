import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CampaignCreateWithoutPlayersInput } from "../inputs/CampaignCreateWithoutPlayersInput";
import { CampaignWhereUniqueInput } from "../inputs/CampaignWhereUniqueInput";

@TypeGraphQL.InputType("CampaignCreateOrConnectWithoutPlayersInput", {
  isAbstract: true
})
export class CampaignCreateOrConnectWithoutPlayersInput {
  @TypeGraphQL.Field(_type => CampaignWhereUniqueInput, {
    nullable: false
  })
  where!: CampaignWhereUniqueInput;

  @TypeGraphQL.Field(_type => CampaignCreateWithoutPlayersInput, {
    nullable: false
  })
  create!: CampaignCreateWithoutPlayersInput;
}
