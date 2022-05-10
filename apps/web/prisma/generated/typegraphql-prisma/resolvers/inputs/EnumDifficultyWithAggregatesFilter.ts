import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumDifficultyFilter } from "../inputs/NestedEnumDifficultyFilter";
import { NestedEnumDifficultyWithAggregatesFilter } from "../inputs/NestedEnumDifficultyWithAggregatesFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";
import { Difficulty } from "../../enums/Difficulty";

@TypeGraphQL.InputType("EnumDifficultyWithAggregatesFilter", {
  isAbstract: true
})
export class EnumDifficultyWithAggregatesFilter {
  @TypeGraphQL.Field(_type => Difficulty, {
    nullable: true
  })
  equals?: "Low" | "Medium" | "High" | "Any" | undefined;

  @TypeGraphQL.Field(_type => [Difficulty], {
    nullable: true
  })
  in?: Array<"Low" | "Medium" | "High" | "Any"> | undefined;

  @TypeGraphQL.Field(_type => [Difficulty], {
    nullable: true
  })
  notIn?: Array<"Low" | "Medium" | "High" | "Any"> | undefined;

  @TypeGraphQL.Field(_type => NestedEnumDifficultyWithAggregatesFilter, {
    nullable: true
  })
  not?: NestedEnumDifficultyWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => NestedIntFilter, {
    nullable: true
  })
  _count?: NestedIntFilter | undefined;

  @TypeGraphQL.Field(_type => NestedEnumDifficultyFilter, {
    nullable: true
  })
  _min?: NestedEnumDifficultyFilter | undefined;

  @TypeGraphQL.Field(_type => NestedEnumDifficultyFilter, {
    nullable: true
  })
  _max?: NestedEnumDifficultyFilter | undefined;
}
