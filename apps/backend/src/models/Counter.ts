import { Field, ObjectType, ID, Int } from "type-graphql";

// USING THIS FOR TESTING/LEARNING NEW GRAPHQL STUFF
@ObjectType()
export class Counter {
  @Field((_type) => ID)
  id: string;

  @Field((_type) => Int)
  counter: number;

  // skip overwrite 👇
}
