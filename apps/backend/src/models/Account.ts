import { Field, ObjectType, InputType, ID, Int } from "type-graphql";
import { User } from "./User";

@InputType("AccountInput")
@ObjectType()
export class Account {
  @Field((_type) => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  type: string;

  @Field()
  provider: string;

  @Field()
  providerAccountId: string;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field({ nullable: true })
  accessToken?: string;

  @Field((_type) => Int, { nullable: true })
  expiresAt?: number;

  @Field({ nullable: true })
  tokenType?: string;

  @Field({ nullable: true })
  scope?: string;

  @Field({ nullable: true })
  idToken?: string;

  @Field({ nullable: true })
  sessionState?: string;

  @Field({ nullable: true })
  oauthTokenSecret?: string;

  @Field({ nullable: true })
  oauthToken?: string;

  @Field((_type) => User)
  user: User;

  // skip overwrite 👇
}
