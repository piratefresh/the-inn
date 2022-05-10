import * as TypeGraphQL from "type-graphql";

export enum Difficulty {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Any = "Any"
}
TypeGraphQL.registerEnumType(Difficulty, {
  name: "Difficulty",
  description: undefined,
});
