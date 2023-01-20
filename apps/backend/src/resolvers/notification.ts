import { PrivateMessage } from "@/models/PrivateMessage";
import { User } from "@/models/User";
import { Notification } from "@models/Notification";
import { MyContext } from "@typedefs/MyContext";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";

@ObjectType()
export class NewNotification {
  @Field({ nullable: true })
  gameMasterId: string;

  @Field({ nullable: true })
  campaignId?: string;

  @Field()
  notificationId: string;

  @Field()
  message: string;

  @Field()
  type: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field()
  relatedId: string;

  @Field()
  read: boolean;

  @Field()
  imageUrl: string;

  @Field((type) => User)
  user: User;
}

@Resolver(Notification)
export class NotificationResolver {
  @Query(() => [Notification])
  async getAllNotifications(@Ctx() { prisma, req }: MyContext) {
    return prisma.notification.findMany({
      where: {
        userId: req.session.userId,
      },
      include: {
        user: true,
      },
    });
  }
  @Query(() => [Notification])
  async getUnreadNotifications(@Ctx() { prisma, req }: MyContext) {
    return prisma.notification.findMany({
      where: {
        userId: req.session.userId,
        read: false,
      },
    });
  }
  @Query(() => [Notification])
  async getReadNotifications(@Ctx() { prisma, req }: MyContext) {
    return prisma.notification.findMany({
      where: {
        userId: req.session.userId,
        read: true,
      },
    });
  }
  @Mutation(() => [Notification])
  async setNotificationsRead(
    @Arg("ids", (type) => [String]) ids: string[],
    @Ctx() { prisma, req }: MyContext
  ) {
    await prisma.notification.updateMany({
      data: {
        read: true,
      },
      where: {
        id: {
          in: ids,
        },
      },
    });

    return await prisma.notification.findMany({
      where: { id: { in: ids } },
    });
  }
  @Subscription({
    topics: "NEW_NOTIFICATION_CAMPAIGN_APPLICATION",
    filter: ({
      payload,
      args,
      context,
    }: {
      payload: NewNotification;
      args: any;
      context: MyContext;
    }) => {
      return context.req.session.userId === payload.gameMasterId;
    },
  })
  newCampaignApplication(
    @Root()
    data: NewNotification,
    @Ctx() { prisma, res, req }: MyContext
  ): NewNotification {
    return data;
  }

  @Subscription({
    topics: "NEW_NOTIFICATION_PRIVATE_MESSAGE",
    filter: ({
      payload,
      args,
      context,
    }: {
      payload: NewNotification;
      args: any;
      context: MyContext;
    }) => {
      return context.req.session.userId === payload.relatedId;
    },
  })
  newPrivateMessageNotification(
    @Root()
    data: NewNotification,
    @Ctx() { prisma, res, req }: MyContext
  ): NewNotification {
    return data;
  }
}
