import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserUpdateWithoutCampaignInput } from "../inputs/UserUpdateWithoutCampaignInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType("UserUpdateWithWhereUniqueWithoutCampaignInput", {
  isAbstract: true
})
export class UserUpdateWithWhereUniqueWithoutCampaignInput {
  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: false
  })
  where!: UserWhereUniqueInput;

  @TypeGraphQL.Field(_type => UserUpdateWithoutCampaignInput, {
    nullable: false
  })
  data!: UserUpdateWithoutCampaignInput;
}
