import { registerEnumType } from "type-graphql";

export enum MembershipRole {
  GM = "GM",
  PLAYER = "PLAYER",
  PENDING = "PENDING",
}
registerEnumType(MembershipRole, {
  name: "MembershipRole",
});
