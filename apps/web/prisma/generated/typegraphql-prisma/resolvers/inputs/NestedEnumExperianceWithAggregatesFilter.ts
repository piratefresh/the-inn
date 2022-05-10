import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumExperianceFilter } from "../inputs/NestedEnumExperianceFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";
import { Experiance } from "../../enums/Experiance";

@TypeGraphQL.InputType("NestedEnumExperianceWithAggregatesFilter", {
  isAbstract: true
})
export class NestedEnumExperianceWithAggregatesFilter {
  @TypeGraphQL.Field(_type => Experiance, {
    nullable: true
  })
  equals?: "Beginner" | "Advanced" | "All" | undefined;

  @TypeGraphQL.Field(_type => [Experiance], {
    nullable: true
  })
  in?: Array<"Beginner" | "Advanced" | "All"> | undefined;

  @TypeGraphQL.Field(_type => [Experiance], {
    nullable: true
  })
  notIn?: Array<"Beginner" | "Advanced" | "All"> | undefined;

  @TypeGraphQL.Field(_type => NestedEnumExperianceWithAggregatesFilter, {
    nullable: true
  })
  not?: NestedEnumExperianceWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => NestedIntFilter, {
    nullable: true
  })
  _count?: NestedIntFilter | undefined;

  @TypeGraphQL.Field(_type => NestedEnumExperianceFilter, {
    nullable: true
  })
  _min?: NestedEnumExperianceFilter | undefined;

  @TypeGraphQL.Field(_type => NestedEnumExperianceFilter, {
    nullable: true
  })
  _max?: NestedEnumExperianceFilter | undefined;
}
