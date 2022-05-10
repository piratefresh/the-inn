import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumStatusTypeFilter } from "../inputs/NestedEnumStatusTypeFilter";
import { StatusType } from "../../enums/StatusType";

@TypeGraphQL.InputType("EnumStatusTypeFilter", {
  isAbstract: true
})
export class EnumStatusTypeFilter {
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

  @TypeGraphQL.Field(_type => NestedEnumStatusTypeFilter, {
    nullable: true
  })
  not?: NestedEnumStatusTypeFilter | undefined;
}
