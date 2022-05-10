import * as TypeGraphQL from "type-graphql";

export enum StatusType {
  ONLINE = "ONLINE",
  IDLE = "IDLE",
  DND = "DND",
  OFFLINE = "OFFLINE"
}
TypeGraphQL.registerEnumType(StatusType, {
  name: "StatusType",
  description: undefined,
});
