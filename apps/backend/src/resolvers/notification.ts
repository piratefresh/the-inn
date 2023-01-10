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
export class NewCampaignNotification {
  @Field()
  gameMasterId: string;

  @Field()
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
      payload: NewCampaignNotification;
      args: any;
      context: MyContext;
    }) => {
      return context.req.session.userId === payload.gameMasterId;
    },
  })
  newCampaignApplication(
    @Root()
    data: NewCampaignNotification,
    @Ctx() { prisma, res, req }: MyContext
  ): NewCampaignNotification {
    console.log("SENDING NOTIFICATION: ", req.session.userId);

    console.log("data: ", data);

    return data;
  }
}
