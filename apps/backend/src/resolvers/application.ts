import { FieldsValidationError } from "@errors/FieldsValidationError";
import { Application } from "@models/Application";
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

@Resolver(Application)
export class ApplicationResolver {
  @Query(() => [Application])
  async getApplicationCampaign(
    @Arg("campaignId") campaignId: string,
    @Ctx() { prisma }: MyContext
  ) {
    return prisma.application.findMany({
      where: {
        campaignId,
      },
      include: {
        membership: {
          include: {
            user: true,
          },
        },
      },
    });
  }
}
