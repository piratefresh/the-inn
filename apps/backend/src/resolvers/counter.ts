import { FieldsValidationError } from "@errors/FieldsValidationError";
import { Counter } from "@models/Counter";
import { MyContext } from "@typedefs/MyContext";
import AblyPubSub from "ablyPubsub";
import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";

let currentNumber = 0;
function incrementNumber() {
  currentNumber++;

  setTimeout(incrementNumber, 1000);
  return currentNumber;
}

@Resolver(Counter)
export class CounterResolver {
  @Query((_type) => Int)
  async currentNumber(
    @Ctx() { prisma }: MyContext,
    @PubSub() pubSub: PubSubEngine
  ) {
    try {
      // In the background, increment a number every second and notify subscribers when it changes.
      const currentNumber = incrementNumber();

      pubSub.publish("NUMBER_INCREMENTED", {
        numberIncremented: currentNumber,
      });

      return currentNumber;
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  }

  @Subscription({ topics: "NUMBER_INCREMENTED" })
  numberIncremented(@Root() currentNumber: number): number {
    console.log("payload: ", currentNumber);
    return 22;
  }
}
