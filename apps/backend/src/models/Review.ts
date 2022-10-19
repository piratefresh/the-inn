import { Field, ObjectType, ID, Int } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Review {
  @Field((_type) => ID)
  id: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field((_type) => Int)
  rating: number;

  @Field()
  comment: string;

  @Field()
  user_id: string;

  @Field((_type) => User)
  user: User;

  // skip overwrite 👇
}
