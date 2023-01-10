import { Application } from "@models/Application";
import { Campaign } from "@models/Campaign";
import { Prisma } from "@prisma/client";
import { MembershipRole } from "@typedefs/MembershipRole";
import { MyContext } from "@typedefs/MyContext";
import { NotificationType } from "@typedefs/NotificationType";
import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
} from "type-graphql";
import { EdgeType } from "typegraphql-relay-connections";
import { CreateCampaignResult } from "./campaign";
import { CampaignApplicationInput } from "./CampaignApplicationInput";

@ObjectType()
export class ApplicationEdge extends EdgeType(Application) {}

@ObjectType()
export class ApplicationConnection {
  @Field((type) => [Application])
  applications: Application[];
  @Field((type) => Int)
  totalCount: number;
  @Field((type) => Int)
  pageCount: number;
}

@ArgsType()
export class PaginationArgs {
  @Field((type) => Int, { nullable: true })
  skip?: number;
  @Field((type) => Int, { nullable: true })
  take?: number;
  @Field({ nullable: true })
  after?: string;
  @Field({ nullable: true })
  sort?: string;
}

export const getSortArray = (sort: { [key: string]: "asc" | "desc" }) => {
  const keys = Object.keys(sort);
  const arr: any[] = [];
  keys.forEach((key) => {
    arr.push({ [key]: sort[key] });
  });

  return arr;
};

@Resolver(Application)
export class ApplicationResolver {
  @Query(() => ApplicationConnection)
  async getApplicationCampaign(
    @Arg("campaignId") campaignId: string,
    @Args() { skip, after, take, sort }: PaginationArgs,
    @Ctx() { prisma }: MyContext
  ) {
    const sorting = sort?.split(",");
    const orderBy: Prisma.ApplicationOrderByWithRelationInput = sorting?.map(
      (s) => {
        const x = s.split("-");
        switch (x[0]) {
          case "name":
            return {
              lastName:
                x[1] === "asc" ? Prisma.SortOrder.asc : Prisma.SortOrder.desc,
            };

          default:
            return {
              [x[0]]:
                x[1] === "asc" ? Prisma.SortOrder.asc : Prisma.SortOrder.desc,
            };
        }
      }
    )[0];

    const applications = await prisma.application.findMany({
      // Sometimes skip becomes negative
      skip: Math.abs(skip),
      take,
      where: {
        campaignId,
      },

      include: {
        user: true,
        membership: {
          include: {
            user: {
              include: {
                memberships: true,
              },
            },
          },
        },
      },
      orderBy: sort ? orderBy : undefined,
    });

    const totalCount = await prisma.application.count({
      where: {
        campaignId,
      },
    });
    const pageCount: number = Math.ceil(totalCount / take);

    return {
      applications: applications,
      totalCount: totalCount,
      pageCount: pageCount,
    };
  }

  @Mutation((_type) => CreateCampaignResult)
  async addPlayerApplication(
    @Arg("campaignApplicationInput")
    campaignApplicationInput: CampaignApplicationInput,
    @Ctx() { prisma, req, theInnIndex }: MyContext,
    @PubSub() pubSub: PubSubEngine
  ) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.session.userId,
        },
      });

      const userMembership = await prisma.membership.create({
        data: {
          role: MembershipRole.PENDING,
          campaignId: campaignApplicationInput.campaignId,
          userId: user.id,
          application: {
            create: {
              campaignId: campaignApplicationInput.campaignId,
              fitsSchedule: campaignApplicationInput.fitsSchedule,
              message: campaignApplicationInput.message,
              jsonMessage: campaignApplicationInput.jsonMessage,
              days: campaignApplicationInput.days,
              timePeriods: campaignApplicationInput.timePeriods,
              experience: campaignApplicationInput.experience,
            },
          },
        },
        include: {
          campaign: true,
          user: true,
          application: true,
        },
      });

      if (userMembership) {
        const foundCampaign = await prisma.campaign.findUnique({
          where: {
            id: campaignApplicationInput.campaignId,
          },
          include: {
            memberships: {
              include: {
                application: {
                  include: {
                    membership: true,
                  },
                },
                campaign: true,
                user: true,
              },
            },
            gameMaster: true,
          },
        });

        const notification = await prisma.notification.create({
          data: {
            message: `New Application Received ${foundCampaign.title}`,
            type: NotificationType.Campaign,
            relatedId: foundCampaign.id,
            userId: foundCampaign.gameMaster.id,
            imageUrl: foundCampaign.imageUrl,
          },
          include: {
            user: true,
          },
        });

        const players = foundCampaign.memberships.filter(
          (member) => member.role === MembershipRole.PLAYER
        );

        const pending = foundCampaign.memberships.filter(
          (member) => member.role === MembershipRole.PENDING
        );

        await theInnIndex.saveObject({
          ...foundCampaign,
          objectID: foundCampaign.id,
          members: players.length,
          pending,
        });

        await pubSub.publish("NEW_NOTIFICATION_CAMPAIGN_APPLICATION", {
          gameMasterId: foundCampaign.gameMaster.id,
          campaignId: foundCampaign.id,
          notificationId: notification.id,
          message: notification.message,
          type: notification.type,
          createdAt: notification.createdAt,
          read: notification.read,
          updatedAt: notification.updatedAt,
          relatedId: notification.relatedId,
        });

        return Object.assign(new Campaign(), foundCampaign);
      }
    } catch (err) {
      throw err;
    }
  }
}
