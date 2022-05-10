import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateWithoutHostedInput } from "../inputs/UserCreateWithoutHostedInput";
import { UserUpdateWithoutHostedInput } from "../inputs/UserUpdateWithoutHostedInput";

@TypeGraphQL.InputType("UserUpsertWithoutHostedInput", {
  isAbstract: true
})
export class UserUpsertWithoutHostedInput {
  @TypeGraphQL.Field(_type => UserUpdateWithoutHostedInput, {
    nullable: false
  })
  update!: UserUpdateWithoutHostedInput;

  @TypeGraphQL.Field(_type => UserCreateWithoutHostedInput, {
    nullable: false
  })
  create!: UserCreateWithoutHostedInput;
}
