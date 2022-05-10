import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CampaignCreateOrConnectWithoutPlayersInput } from "../inputs/CampaignCreateOrConnectWithoutPlayersInput";
import { CampaignCreateWithoutPlayersInput } from "../inputs/CampaignCreateWithoutPlayersInput";
import { CampaignScalarWhereInput } from "../inputs/CampaignScalarWhereInput";
import { CampaignUpdateManyWithWhereWithoutPlayersInput } from "../inputs/CampaignUpdateManyWithWhereWithoutPlayersInput";
import { CampaignUpdateWithWhereUniqueWithoutPlayersInput } from "../inputs/CampaignUpdateWithWhereUniqueWithoutPlayersInput";
import { CampaignUpsertWithWhereUniqueWithoutPlayersInput } from "../inputs/CampaignUpsertWithWhereUniqueWithoutPlayersInput";
import { CampaignWhereUniqueInput } from "../inputs/CampaignWhereUniqueInput";

@TypeGraphQL.InputType("CampaignUpdateManyWithoutPlayersInput", {
  isAbstract: true
})
export class CampaignUpdateManyWithoutPlayersInput {
  @TypeGraphQL.Field(_type => [CampaignCreateWithoutPlayersInput], {
    nullable: true
  })
  create?: CampaignCreateWithoutPlayersInput[] | undefined;

  @TypeGraphQL.Field(_type => [CampaignCreateOrConnectWithoutPlayersInput], {
    nullable: true
  })
  connectOrCreate?: CampaignCreateOrConnectWithoutPlayersInput[] | undefined;

  @TypeGraphQL.Field(_type => [CampaignUpsertWithWhereUniqueWithoutPlayersInput], {
    nullable: true
  })
  upsert?: CampaignUpsertWithWhereUniqueWithoutPlayersInput[] | undefined;

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

  @TypeGraphQL.Field(_type => [CampaignUpdateWithWhereUniqueWithoutPlayersInput], {
    nullable: true
  })
  update?: CampaignUpdateWithWhereUniqueWithoutPlayersInput[] | undefined;

  @TypeGraphQL.Field(_type => [CampaignUpdateManyWithWhereWithoutPlayersInput], {
    nullable: true
  })
  updateMany?: CampaignUpdateManyWithWhereWithoutPlayersInput[] | undefined;

  @TypeGraphQL.Field(_type => [CampaignScalarWhereInput], {
    nullable: true
  })
  deleteMany?: CampaignScalarWhereInput[] | undefined;
}
