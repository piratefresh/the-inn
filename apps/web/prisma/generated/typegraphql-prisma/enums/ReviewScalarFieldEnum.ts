import * as TypeGraphQL from "type-graphql";

export enum ReviewScalarFieldEnum {
  id = "id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  rating = "rating",
  comment = "comment",
  userId = "userId"
}
TypeGraphQL.registerEnumType(ReviewScalarFieldEnum, {
  name: "ReviewScalarFieldEnum",
  description: undefined,
});
