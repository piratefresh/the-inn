import { NotificationType } from "@/typedefs/NotificationType";
import { PrivateMessage } from "@models/PrivateMessage";
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
@ObjectType()
class UserLite {
  @Field()
  id: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  imageUrl: string;
}
@InterfaceType()
@ObjectType()
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
  @Field()
  senderId: string;
  @Field()
  recipientId: string;
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
    const userId = req.session.userId;
    try {
      const messages = await prisma.privateMessage.findMany({
        where: {
          OR: [
            {
              AND: [{ senderId: userId }],
            },
            {
              AND: [{ recipientId: userId }],
            },
          ],
        },
        orderBy: { createdAt: "desc" },
        include: {
          sender: true,
          recipient: true,
        },
      });

      const latestMessages = messages.reduce((acc: any, message) => {
        // Make sure key is the unique otherUserId
        const otherUserId =
          message.senderId === userId ? message.recipientId : message.senderId;
        if (
          // if the key dosent exist make it else if an newer message exists override it
          !acc[otherUserId] ||
          message.createdAt > acc[otherUserId].createdAt
        ) {
          acc[otherUserId] = message;
        }
        return acc;
      }, {});

      // values are inside unique user key now, get from valus
      console.log(Object.values(latestMessages));

      return Object.values(latestMessages);
    } catch (err) {
      console.log("err: ", err);
    }
  }
  @Query((_type) => [PrivateMessage])
  async getThreadMessages(
    @Arg("threadId") threadId: string,
    @Ctx() { req, res, prisma }: MyContext
  ) {
    const userId = req.session.userId;
    return await prisma.privateMessage.findMany({
      where: {
        OR: [
          {
            recipientId: userId,
            senderId: threadId,
          },
          {
            recipientId: threadId,
            senderId: userId,
          },
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

    @Ctx() { prisma, req }: MyContext,
    @PubSub() pubSub: PubSubEngine
  ) {
    try {
      // Create or update chat
      const message = await prisma.privateMessage.create({
        data: {
          ...addPrivateMessageInput,
        },
        include: {
          recipient: true,
          sender: true,
        },
      });

      pubSub.publish("NEW_PRIVATE_MESSAGE", message);

      const notification = await prisma.notification.create({
        data: {
          message: message.message,
          type: NotificationType.PrivateMessage,
          relatedId: message.recipientId,
          userId: req.session.userId,
          imageUrl: "",
        },
        include: {
          user: true,
        },
      });

      pubSub.publish("NEW_NOTIFICATION_PRIVATE_MESSAGE", notification);

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
    }) =>
      context.req.session.userId === payload.senderId ||
      context.req.session.userId === payload.recipientId,
  })
  newPrivateMessage(@Root() data: PrivateMessage): PrivateMessagePayload {
    return Object.assign(new PrivateMessagePayload(), {
      createdAt: new Date(data.createdAt),
      id: data.id,
      message: data.message,
      recipientId: data.recipientId,
      senderId: data.senderId,
      recipient: {
        firstName: data.recipient.firstName,
        lastName: data.recipient.lastName,
        id: data.recipient.id,
        imageUrl: data.recipient.imageUrl ?? "",
      },
      sender: {
        firstName: data.sender.firstName,
        lastName: data.sender.lastName,
        id: data.sender.id,
        imageUrl: data.sender.imageUrl ?? "",
      },
      updatedAt: new Date(data.updatedAt),
    });
  }
}
