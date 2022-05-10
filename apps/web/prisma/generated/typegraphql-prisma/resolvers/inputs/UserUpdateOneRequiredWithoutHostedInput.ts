import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateOrConnectWithoutHostedInput } from "../inputs/UserCreateOrConnectWithoutHostedInput";
import { UserCreateWithoutHostedInput } from "../inputs/UserCreateWithoutHostedInput";
import { UserUpdateWithoutHostedInput } from "../inputs/UserUpdateWithoutHostedInput";
import { UserUpsertWithoutHostedInput } from "../inputs/UserUpsertWithoutHostedInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType("UserUpdateOneRequiredWithoutHostedInput", {
  isAbstract: true
})
export class UserUpdateOneRequiredWithoutHostedInput {
  @TypeGraphQL.Field(_type => UserCreateWithoutHostedInput, {
    nullable: true
  })
  create?: UserCreateWithoutHostedInput | undefined;

  @TypeGraphQL.Field(_type => UserCreateOrConnectWithoutHostedInput, {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutHostedInput | undefined;

  @TypeGraphQL.Field(_type => UserUpsertWithoutHostedInput, {
    nullable: true
  })
  upsert?: UserUpsertWithoutHostedInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: true
  })
  connect?: UserWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => UserUpdateWithoutHostedInput, {
    nullable: true
  })
  update?: UserUpdateWithoutHostedInput | undefined;
}
