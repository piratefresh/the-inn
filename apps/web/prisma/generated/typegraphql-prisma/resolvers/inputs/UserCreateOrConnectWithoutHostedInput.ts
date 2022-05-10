import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateWithoutHostedInput } from "../inputs/UserCreateWithoutHostedInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType("UserCreateOrConnectWithoutHostedInput", {
  isAbstract: true
})
export class UserCreateOrConnectWithoutHostedInput {
  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: false
  })
  where!: UserWhereUniqueInput;

  @TypeGraphQL.Field(_type => UserCreateWithoutHostedInput, {
    nullable: false
  })
  create!: UserCreateWithoutHostedInput;
}
