import { Field, ObjectType, ID } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Session {
  @Field(() => String)
  id: string;

  @Field()
  sessionToken: string;

  @Field()
  userId: string;

  @Field()
  expires: Date;

  @Field((_type) => User)
  user: User;

  // skip overwrite 👇
}