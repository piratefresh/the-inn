import { Field, ObjectType, ID, Int, InputType } from "type-graphql";
import { User } from "./User";

@InputType("reviewInput")
@ObjectType()
export class Review {
  @Field((_type) => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field((_type) => Int)
  rating: number;

  @Field()
  comment: string;

  @Field()
  userId: string;

  @Field((_type) => User)
  user: User;

  // skip overwrite 👇
}
