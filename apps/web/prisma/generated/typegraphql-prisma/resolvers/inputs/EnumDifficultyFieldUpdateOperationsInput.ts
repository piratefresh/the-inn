import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Difficulty } from "../../enums/Difficulty";

@TypeGraphQL.InputType("EnumDifficultyFieldUpdateOperationsInput", {
  isAbstract: true
})
export class EnumDifficultyFieldUpdateOperationsInput {
  @TypeGraphQL.Field(_type => Difficulty, {
    nullable: true
  })
  set?: "Low" | "Medium" | "High" | "Any" | undefined;
}
