import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumExperianceFilter } from "../inputs/NestedEnumExperianceFilter";
import { Experiance } from "../../enums/Experiance";

@TypeGraphQL.InputType("EnumExperianceFilter", {
  isAbstract: true
})
export class EnumExperianceFilter {
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

  @TypeGraphQL.Field(_type => NestedEnumExperianceFilter, {
    nullable: true
  })
  not?: NestedEnumExperianceFilter | undefined;
}
