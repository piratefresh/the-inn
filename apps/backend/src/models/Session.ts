import { Field, ObjectType, InputType, ID } from "type-graphql";
import { User } from "./User";

@InputType("sessionInput")
@ObjectType()
export class Session {
  @Field((_type) => ID)
  id: string;

  @Field()
  session_token: string;

  @Field()
  user_id: string;

  @Field()
  expires: Date;

  @Field((_type) => User)
  user: User;

  // skip overwrite 👇
}
