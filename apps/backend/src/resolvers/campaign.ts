import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { MyContext } from "@typedefs/MyContext";
import { FieldsValidationError } from "@errors/FieldsValidationError";
import { BadCredentialsError } from "@errors/BadCredentialsError";
import { Campaign } from "@models/Campaign";
import { NonExistingCampaignError } from "@errors/NonExistingCampaignError";
import { v2 as cloudinary } from "cloudinary";
import { MembershipRole } from "@typedefs/MembershipRole";
import { CreateCampaignInput } from "./CreateCampaignInput";
import { CampaignApplicationInput } from "./CampaignApplicationInput";
import { Notification } from "@models/Notification";
import { NotificationType } from "@typedefs/NotificationType";

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

export const AuthResult = createUnionType({
  name: "AuthResult",
  types: () =>
    [
      Campaign,
      FieldsValidationError,
      NonExistingCampaignError,
      BadCredentialsError,
    ] as const,
});

export const CreateCampaignResult = createUnionType({
  name: "CreateCampaignResult",
  types: () => [Campaign, FieldsValidationError] as const,
});

@InputType()
export class AddPlayerCampaignInput {
  @Field()
  campaignId: string;
}

@ObjectType()
class ImageSignature {
  @Field((_type) => String)
  signature!: string;

  @Field((_type) => Int)
  timestamp!: number;
}
@ObjectType()
class CampaignPagination {
  @Field((_type) => [Campaign])
  campaigns!: Campaign[];
  @Field()
  cursor!: string;
  @Field((_type) => Boolean)
  hasNextPage: boolean;
}

@Resolver(Campaign)
export class CampaignResolver {
  @Query(() => String)
  async hellogame() {
    return "hello game";
  }
  @Query(() => [Campaign])
  async getCampaigns(@Ctx() { prisma, res, req, redis }: MyContext) {
    return prisma.campaign.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        memberships: {
          include: {
            user: true,
          },
        },
        gameMaster: true,
      },
    });
  }
  @Query(() => CampaignPagination)
  async getCampaignsPagination(
    @Arg("cursor", { nullable: true }) cursor: string,
    @Arg("limit", { defaultValue: 4 }) limit: number,
    @Ctx() { prisma, res, req }: MyContext
  ) {
    let queryResults = null;

    if (cursor)
      queryResults = await prisma.campaign.findMany({
        take: limit,
        skip: 1, // Skip the cursor
        cursor: {
          id: cursor,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    else
      queryResults = await prisma.campaign.findMany({
        take: limit,
      });

    if (queryResults.length > 0) {
      // Get the last post id
      const lastPostInResults = queryResults[queryResults.length - 1]; // Remember: zero-based index! :)

      const after = lastPostInResults.id; // Example: 52

      // query after the cursor to check if we have nextPage
      const secondQueryResults = await prisma.campaign.findMany({
        take: limit,
        cursor: {
          id: after,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return {
        campaigns: queryResults,
        cursor: after,
        hasNextPage: secondQueryResults.length >= limit,
      };
    }

    return {
      campaigns: [],
      cursor: null,
      hasNextPage: false,
    };
  }

  @Query(() => Campaign)
  async getCampaign(
    @Arg("id") id: string,
    @Ctx() { prisma, res, req }: MyContext
  ) {
    return prisma.campaign.findUnique({
      where: {
        id,
      },
      include: {
        gameMaster: true,
        memberships: {
          select: {
            role: true,
            user: true,
            campaign: true,
            application: true,
          },
        },
      },
    });
  }
  @Query(() => [Campaign])
  async getUserCampaign(@Ctx() { prisma, res, req }: MyContext) {
    console.log("user ID: ", req.session.userId);
    return prisma.campaign.findMany({
      where: {
        gameMaster: {
          id: req.session.userId,
        },
      },
      include: {
        memberships: {
          include: {
            user: true,
          },
        },
        gameMaster: true,
      },
    });
  }

  @Mutation((_type) => CreateCampaignResult)
  async createCampaign(
    @Arg("createCampaignInput") createCampaignInput: CreateCampaignInput,
    @Ctx() { prisma, res, req }: MyContext
  ) {
    try {
      const campaign = await prisma.campaign.create({
        data: {
          ...createCampaignInput,
          gameMaster: {
            connect: {
              id: req.session.userId,
            },
          },
          memberships: {
            create: {
              role: MembershipRole.GM,
              userId: req.session.userId,
            },
          },
        },
      });

      console.log("campaign: ", campaign);

      return Object.assign(new Campaign(), campaign);
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  }
  @Mutation((_type) => CreateCampaignResult)
  async addPlayerApplication(
    @Arg("campaignApplicationInput")
    campaignApplicationInput: CampaignApplicationInput,
    @Ctx() { prisma, res, req }: MyContext,
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
          },
          include: {
            user: true,
          },
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
  @Mutation((_type) => CreateCampaignResult)
  async addCampaignPlayer(
    @Arg("AddPlayerCampaignInput")
    addPlayerCampaignInput: AddPlayerCampaignInput,
    @Ctx() { prisma, res, req }: MyContext
  ) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.session.userId,
        },
      });

      const userMembership = await prisma.membership.create({
        data: {
          role: MembershipRole.PLAYER,
          campaignId: addPlayerCampaignInput.campaignId,
          userId: user.id,
        },
        include: {
          campaign: true,
          user: true,
        },
      });

      console.log("userMembership: ", userMembership);

      if (userMembership) {
        const foundCampaign = await prisma.campaign.findUnique({
          where: {
            id: addPlayerCampaignInput.campaignId,
          },
          include: {
            memberships: {
              select: {
                campaign: true,
                role: true,
                user: true,
              },
            },
            gameMaster: true,
          },
        });

        console.log("foundCampaign: ", foundCampaign);

        return Object.assign(new Campaign(), foundCampaign);
      }
    } catch (err) {
      throw err;
    }
  }
  @Mutation((_returns) => ImageSignature)
  createImageSignature(): ImageSignature {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature: string = cloudinary.utils.api_sign_request(
      {
        timestamp,
        upload_preset: "the_inn_campaign",
        folder: "The inn/campaignmedia",
      },
      process.env.CLOUDINARY_API_SECRET
    );
    return { timestamp, signature };
  }
}
