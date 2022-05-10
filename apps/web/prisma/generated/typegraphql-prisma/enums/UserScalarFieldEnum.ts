import * as TypeGraphQL from "type-graphql";

export enum UserScalarFieldEnum {
  id = "id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  email = "email",
  emailVerified = "emailVerified",
  image = "image",
  name = "name",
  experience = "experience",
  twitter = "twitter",
  facebook = "facebook",
  discord = "discord",
  youtube = "youtube",
  status = "status",
  campaignId = "campaignId"
}
TypeGraphQL.registerEnumType(UserScalarFieldEnum, {
  name: "UserScalarFieldEnum",
  description: undefined,
});
