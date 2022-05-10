import * as TypeGraphQL from "type-graphql";

export enum Experiance {
  Beginner = "Beginner",
  Advanced = "Advanced",
  All = "All"
}
TypeGraphQL.registerEnumType(Experiance, {
  name: "Experiance",
  description: undefined,
});
