import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { StatusType } from "../../enums/StatusType";

@TypeGraphQL.InputType("EnumStatusTypeFieldUpdateOperationsInput", {
  isAbstract: true
})
export class EnumStatusTypeFieldUpdateOperationsInput {
  @TypeGraphQL.Field(_type => StatusType, {
    nullable: true
  })
  set?: "ONLINE" | "IDLE" | "DND" | "OFFLINE" | undefined;
}
