import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Experiance } from "../../enums/Experiance";

@TypeGraphQL.InputType("EnumExperianceFieldUpdateOperationsInput", {
  isAbstract: true
})
export class EnumExperianceFieldUpdateOperationsInput {
  @TypeGraphQL.Field(_type => Experiance, {
    nullable: true
  })
  set?: "Beginner" | "Advanced" | "All" | undefined;
}
