import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CampaignCreateOrConnectWithoutPlayersInput } from "../inputs/CampaignCreateOrConnectWithoutPlayersInput";
import { CampaignCreateWithoutPlayersInput } from "../inputs/CampaignCreateWithoutPlayersInput";
import { CampaignWhereUniqueInput } from "../inputs/CampaignWhereUniqueInput";

@TypeGraphQL.InputType("CampaignCreateNestedManyWithoutPlayersInput", {
  isAbstract: true
})
export class CampaignCreateNestedManyWithoutPlayersInput {
  @TypeGraphQL.Field(_type => [CampaignCreateWithoutPlayersInput], {
    nullable: true
  })
  create?: CampaignCreateWithoutPlayersInput[] | undefined;

  @TypeGraphQL.Field(_type => [CampaignCreateOrConnectWithoutPlayersInput], {
    nullable: true
  })
  connectOrCreate?: CampaignCreateOrConnectWithoutPlayersInput[] | undefined;

  @TypeGraphQL.Field(_type => [CampaignWhereUniqueInput], {
    nullable: true
  })
  connect?: CampaignWhereUniqueInput[] | undefined;
}
