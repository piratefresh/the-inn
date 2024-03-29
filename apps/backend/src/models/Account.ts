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
  refresh_token?: string;

  @Field({ nullable: true })
  access_token?: string;

  @Field((_type) => Int, { nullable: true })
  expires_at?: number;

  @Field({ nullable: true })
  token_type?: string;

  @Field({ nullable: true })
  scope?: string;

  @Field({ nullable: true })
  id_token?: string;

  @Field({ nullable: true })
  session_state?: string;

  @Field((_type) => User)
  user: User;

  // skip overwrite 👇
}
