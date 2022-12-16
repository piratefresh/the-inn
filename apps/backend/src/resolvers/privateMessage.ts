import { PrivateMessage } from "@models/PrivateMessage";
import { User } from "@models/User";
import { MyContext } from "@typedefs/MyContext";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  InterfaceType,
  Mutation,
  ObjectType,
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

@InterfaceType()
class UserLite {
  @Field()
  id: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
}
@InterfaceType()
class PrivateMessagePayload {
  @Field()
  message: string;
  @Field()
  id: string;
  @Field()
  sender: UserLite;
  @Field()
  recipient: UserLite;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

@ObjectType()
export class PrivateMessageObj {
  @Field()
  message: string;
  @Field()
  id: string;
  @Field()
  senderId: string;
  @Field()
  recipientId: string;
}

export interface IPrivateMessage {
  id: string;
  message: string;
  sender: {
    id: string;
  };
  recipient: {
    id: string;
  };
}

@InputType()
export class PrivateMessageInput {
  @Field()
  message: string;
  @Field()
  senderId: string;
  @Field()
  recipientId: string;
  @Field({ nullable: true })
  hasAttachment: boolean;
  @Field({ nullable: true })
  attachmentType: string;
  @Field({ nullable: true })
  attachmentPending: boolean;
  @Field({ nullable: true })
  attachmentError: boolean;
  @Field({ nullable: true })
  attachmentKey: string;
}

@Resolver(PrivateMessage)
export class PrivateMessageResolver {
  @Query((_type) => [PrivateMessage])
  async getAllPrivateMessages(@Ctx() { prisma }: MyContext) {
    return await prisma.privateMessage.findMany({
      include: {
        recipient: true,
        sender: true,
      },
    });
  }
  @Query((_type) => [PrivateMessage])
  async getUserPrivateMessages(@Ctx() { req, res, prisma }: MyContext) {
    const userId = "43fbba47-eb2d-412c-9a66-2343492a6693";
    return await prisma.privateMessage.findMany({
      where: {
        OR: [
          {
            senderId: userId,
          },
          { recipientId: userId },
        ],
      },
      include: {
        recipient: true,
        sender: true,
      },
    });
  }
  @Mutation((_type) => PrivateMessage)
  async addPrivateMessage(
    @Arg("AddPrivateMessageInput")
    addPrivateMessageInput: PrivateMessageInput,
    // @ts-ignore
    @Ctx() { prisma, req, res, userId }: MyContext,
    @PubSub() pubSub: PubSubEngine
  ) {
    try {
      // Create or update chat
      const message = await prisma.privateMessage.create({
        data: { ...addPrivateMessageInput },
        include: {
          recipient: true,
          sender: true,
        },
      });

      pubSub.publish("NEW_PRIVATE_MESSAGE", message);

      return message;
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  }

  @Subscription({
    topics: "NEW_PRIVATE_MESSAGE",
    filter: ({
      payload,
      args,
      context,
    }: {
      payload: PrivateMessage;
      args: any;
      context: MyContext;
    }) => {
      return (
        context.req.session.userId === payload.senderId ||
        context.req.session.userId === payload.recipientId
      );
    },
  })
  newPrivateMessage(@Root() data: PrivateMessage): PrivateMessage {
    return data;
  }
}
