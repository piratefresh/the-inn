import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CampaignCreateManyGame_masterInputEnvelope } from "../inputs/CampaignCreateManyGame_masterInputEnvelope";
import { CampaignCreateOrConnectWithoutGame_masterInput } from "../inputs/CampaignCreateOrConnectWithoutGame_masterInput";
import { CampaignCreateWithoutGame_masterInput } from "../inputs/CampaignCreateWithoutGame_masterInput";
import { CampaignScalarWhereInput } from "../inputs/CampaignScalarWhereInput";
import { CampaignUpdateManyWithWhereWithoutGame_masterInput } from "../inputs/CampaignUpdateManyWithWhereWithoutGame_masterInput";
import { CampaignUpdateWithWhereUniqueWithoutGame_masterInput } from "../inputs/CampaignUpdateWithWhereUniqueWithoutGame_masterInput";
import { CampaignUpsertWithWhereUniqueWithoutGame_masterInput } from "../inputs/CampaignUpsertWithWhereUniqueWithoutGame_masterInput";
import { CampaignWhereUniqueInput } from "../inputs/CampaignWhereUniqueInput";

@TypeGraphQL.InputType("CampaignUpdateManyWithoutGame_masterInput", {
  isAbstract: true
})
export class CampaignUpdateManyWithoutGame_masterInput {
  @TypeGraphQL.Field(_type => [CampaignCreateWithoutGame_masterInput], {
    nullable: true
  })
  create?: CampaignCreateWithoutGame_masterInput[] | undefined;

  @TypeGraphQL.Field(_type => [CampaignCreateOrConnectWithoutGame_masterInput], {
    nullable: true
  })
  connectOrCreate?: CampaignCreateOrConnectWithoutGame_masterInput[] | undefined;

  @TypeGraphQL.Field(_type => [CampaignUpsertWithWhereUniqueWithoutGame_masterInput], {
    nullable: true
  })
  upsert?: CampaignUpsertWithWhereUniqueWithoutGame_masterInput[] | undefined;

  @TypeGraphQL.Field(_type => CampaignCreateManyGame_masterInputEnvelope, {
    nullable: true
  })
  createMany?: CampaignCreateManyGame_masterInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [CampaignWhereUniqueInput], {
    nullable: true
  })
  set?: CampaignWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [CampaignWhereUniqueInput], {
    nullable: true
  })
  disconnect?: CampaignWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [CampaignWhereUniqueInput], {
    nullable: true
  })
  delete?: CampaignWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [CampaignWhereUniqueInput], {
    nullable: true
  })
  connect?: CampaignWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [CampaignUpdateWithWhereUniqueWithoutGame_masterInput], {
    nullable: true
  })
  update?: CampaignUpdateWithWhereUniqueWithoutGame_masterInput[] | undefined;

  @TypeGraphQL.Field(_type => [CampaignUpdateManyWithWhereWithoutGame_masterInput], {
    nullable: true
  })
  updateMany?: CampaignUpdateManyWithWhereWithoutGame_masterInput[] | undefined;

  @TypeGraphQL.Field(_type => [CampaignScalarWhereInput], {
    nullable: true
  })
  deleteMany?: CampaignScalarWhereInput[] | undefined;
}
