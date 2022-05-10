import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumStatusTypeFilter } from "../inputs/NestedEnumStatusTypeFilter";
import { NestedEnumStatusTypeWithAggregatesFilter } from "../inputs/NestedEnumStatusTypeWithAggregatesFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";
import { StatusType } from "../../enums/StatusType";

@TypeGraphQL.InputType("EnumStatusTypeWithAggregatesFilter", {
  isAbstract: true
})
export class EnumStatusTypeWithAggregatesFilter {
  @TypeGraphQL.Field(_type => StatusType, {
    nullable: true
  })
  equals?: "ONLINE" | "IDLE" | "DND" | "OFFLINE" | undefined;

  @TypeGraphQL.Field(_type => [StatusType], {
    nullable: true
  })
  in?: Array<"ONLINE" | "IDLE" | "DND" | "OFFLINE"> | undefined;

  @TypeGraphQL.Field(_type => [StatusType], {
    nullable: true
  })
  notIn?: Array<"ONLINE" | "IDLE" | "DND" | "OFFLINE"> | undefined;

  @TypeGraphQL.Field(_type => NestedEnumStatusTypeWithAggregatesFilter, {
    nullable: true
  })
  not?: NestedEnumStatusTypeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => NestedIntFilter, {
    nullable: true
  })
  _count?: NestedIntFilter | undefined;

  @TypeGraphQL.Field(_type => NestedEnumStatusTypeFilter, {
    nullable: true
  })
  _min?: NestedEnumStatusTypeFilter | undefined;

  @TypeGraphQL.Field(_type => NestedEnumStatusTypeFilter, {
    nullable: true
  })
  _max?: NestedEnumStatusTypeFilter | undefined;
}
