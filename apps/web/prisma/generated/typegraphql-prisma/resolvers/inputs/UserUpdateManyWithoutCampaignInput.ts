import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateOrConnectWithoutCampaignInput } from "../inputs/UserCreateOrConnectWithoutCampaignInput";
import { UserCreateWithoutCampaignInput } from "../inputs/UserCreateWithoutCampaignInput";
import { UserScalarWhereInput } from "../inputs/UserScalarWhereInput";
import { UserUpdateManyWithWhereWithoutCampaignInput } from "../inputs/UserUpdateManyWithWhereWithoutCampaignInput";
import { UserUpdateWithWhereUniqueWithoutCampaignInput } from "../inputs/UserUpdateWithWhereUniqueWithoutCampaignInput";
import { UserUpsertWithWhereUniqueWithoutCampaignInput } from "../inputs/UserUpsertWithWhereUniqueWithoutCampaignInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType("UserUpdateManyWithoutCampaignInput", {
  isAbstract: true
})
export class UserUpdateManyWithoutCampaignInput {
  @TypeGraphQL.Field(_type => [UserCreateWithoutCampaignInput], {
    nullable: true
  })
  create?: UserCreateWithoutCampaignInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserCreateOrConnectWithoutCampaignInput], {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutCampaignInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserUpsertWithWhereUniqueWithoutCampaignInput], {
    nullable: true
  })
  upsert?: UserUpsertWithWhereUniqueWithoutCampaignInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserWhereUniqueInput], {
    nullable: true
  })
  set?: UserWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserWhereUniqueInput], {
    nullable: true
  })
  disconnect?: UserWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserWhereUniqueInput], {
    nullable: true
  })
  delete?: UserWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserWhereUniqueInput], {
    nullable: true
  })
  connect?: UserWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserUpdateWithWhereUniqueWithoutCampaignInput], {
    nullable: true
  })
  update?: UserUpdateWithWhereUniqueWithoutCampaignInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserUpdateManyWithWhereWithoutCampaignInput], {
    nullable: true
  })
  updateMany?: UserUpdateManyWithWhereWithoutCampaignInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserScalarWhereInput], {
    nullable: true
  })
  deleteMany?: UserScalarWhereInput[] | undefined;
}
