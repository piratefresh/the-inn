import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CampaignCreateManyGame_masterInputEnvelope } from "../inputs/CampaignCreateManyGame_masterInputEnvelope";
import { CampaignCreateOrConnectWithoutGame_masterInput } from "../inputs/CampaignCreateOrConnectWithoutGame_masterInput";
import { CampaignCreateWithoutGame_masterInput } from "../inputs/CampaignCreateWithoutGame_masterInput";
import { CampaignWhereUniqueInput } from "../inputs/CampaignWhereUniqueInput";

@TypeGraphQL.InputType("CampaignCreateNestedManyWithoutGame_masterInput", {
  isAbstract: true
})
export class CampaignCreateNestedManyWithoutGame_masterInput {
  @TypeGraphQL.Field(_type => [CampaignCreateWithoutGame_masterInput], {
    nullable: true
  })
  create?: CampaignCreateWithoutGame_masterInput[] | undefined;

  @TypeGraphQL.Field(_type => [CampaignCreateOrConnectWithoutGame_masterInput], {
    nullable: true
  })
  connectOrCreate?: CampaignCreateOrConnectWithoutGame_masterInput[] | undefined;

  @TypeGraphQL.Field(_type => CampaignCreateManyGame_masterInputEnvelope, {
    nullable: true
  })
  createMany?: CampaignCreateManyGame_masterInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [CampaignWhereUniqueInput], {
    nullable: true
  })
  connect?: CampaignWhereUniqueInput[] | undefined;
}
