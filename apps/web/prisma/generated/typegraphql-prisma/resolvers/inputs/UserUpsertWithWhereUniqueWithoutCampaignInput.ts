import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateWithoutCampaignInput } from "../inputs/UserCreateWithoutCampaignInput";
import { UserUpdateWithoutCampaignInput } from "../inputs/UserUpdateWithoutCampaignInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType("UserUpsertWithWhereUniqueWithoutCampaignInput", {
  isAbstract: true
})
export class UserUpsertWithWhereUniqueWithoutCampaignInput {
  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: false
  })
  where!: UserWhereUniqueInput;

  @TypeGraphQL.Field(_type => UserUpdateWithoutCampaignInput, {
    nullable: false
  })
  update!: UserUpdateWithoutCampaignInput;

  @TypeGraphQL.Field(_type => UserCreateWithoutCampaignInput, {
    nullable: false
  })
  create!: UserCreateWithoutCampaignInput;
}
