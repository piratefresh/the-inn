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
import { User } from "@models/User";
import { Membership } from "@models/Membership";
import { Prisma } from "@prisma/client";

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

// FIX TYPE
interface GenerateAlgoliaCampaignsProps {
  campaigns: any;
}

const generateAlgoliaCampaigns = async ({
  campaigns,
}: GenerateAlgoliaCampaignsProps) => {
  return await Promise.all(
    campaigns.map(async (campaign: any) => {
      return {
        ...campaign,
        objectID: campaign.id,
        members: 0,
        pending: 0,
      };
    })
  );
};

@Resolver(Campaign)
export class CampaignResolver {
  @Query(() => String)
  async hellogame() {
    return "hello game";
  }
  @Query(() => [Campaign])
  async updateAlgoliaCampaigns(@Ctx() { prisma, theInnIndex }: MyContext) {
    const campaigns = await prisma.campaign.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        memberships: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                imageUrl: true,
              },
            },
          },
        },
        gameMaster: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            imageUrl: true,
          },
        },
      },
    });
    try {
      const formatCampaigns = campaigns.map((campaign) => ({
        id: campaign.id,
        objectID: campaign.id,
        title: campaign.title,
        createdAt: campaign.createdAt,
        updatedAt: campaign.updatedAt,
        summary: campaign.summary,
        // additionalDetails: campaign.additionalDetails,
        imageUrl: campaign.imageUrl,
        campaignType: campaign.campaignType,
        city: campaign.city,
        state: campaign.state,
        area: campaign.area,
        lat: campaign.lat,
        lng: campaign.lng,
        startDate: campaign.startDate,
        days: campaign.days,
        timePeriods: campaign.timePeriods,
        timezone: campaign.timezone,
        gmId: campaign.gmId,
        experience: campaign.experience,
        voipSystem: campaign.voipSystem,
        gameSystem: campaign.gameSystem,
        virtualTable: campaign.virtualTable,
        maxSeats: campaign.maxSeats,
        isActive: campaign.isActive,
        puzzles: campaign.puzzles,
        combat: campaign.combat,
        roleplay: campaign.roleplay,
        tags: campaign.tags,
        price: campaign.price,
        memberships: campaign.memberships,
        gameMaster: campaign.gameMaster,
      }));
      await theInnIndex.saveObjects(formatCampaigns, {
        autoGenerateObjectIDIfNotExist: true,
      });
    } catch (err) {
      console.log("err: ", JSON.stringify(err));
    }

    return campaigns;
  }
  @Query(() => [Campaign])
  async getCampaigns(@Ctx() { prisma, theInnIndex }: MyContext) {
    const campaigns = await prisma.campaign.findMany({
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

    return campaigns;
  }
  @Query(() => [Campaign])
  async getCampaignsId(@Ctx() { prisma, theInnIndex }: MyContext) {
    const campaigns = await prisma.campaign.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
      },
    });

    return campaigns;
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
    @Ctx() { prisma, req, theInnIndex }: MyContext
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
        include: {
          memberships: true,
        },
      });

      const players = campaign.memberships.filter(
        // Fix later
        (member: any) => member.role === MembershipRole.PLAYER
      );

      await theInnIndex.saveObject({
        ...campaign,
        objectID: campaign.id,
        members: players.length,
        pending: 0,
      });

      return Object.assign(new Campaign(), campaign);
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  }
  @Mutation((_type) => CreateCampaignResult)
  async updateCampaign(
    @Arg("createCampaignInput") createCampaignInput: CreateCampaignInput,
    @Arg("campaignId") campaignId: string,
    @Ctx() { prisma, req, theInnIndex }: MyContext
  ) {
    try {
      const campaign = await prisma.campaign.update({
        where: {
          id: campaignId,
        },
        data: {
          ...createCampaignInput,
        },
      });

      await theInnIndex.saveObject({ ...campaign, objectID: campaign.id });

      return Object.assign(new Campaign(), campaign);
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  }
  @Mutation((_type) => Boolean)
  async deactivateCampaign(
    @Arg("campaignId") campaignId: string,
    @Ctx() { prisma, req, theInnIndex }: MyContext
  ) {
    try {
      await prisma.campaign.update({
        where: {
          id: campaignId,
        },
        data: {
          isActive: false,
        },
      });

      await theInnIndex.partialUpdateObject({
        isActive: false,
        objectID: campaignId,
      });

      return true;
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  }
  @Mutation((_type) => Boolean)
  async deleteCampaign(
    @Arg("campaignId") campaignId: string,
    @Ctx() { prisma, req, theInnIndex }: MyContext
  ) {
    try {
      await prisma.campaign.deleteMany({
        where: {
          id: campaignId,
          gameMaster: {
            id: req.session.userId,
          },
        },
      });

      await theInnIndex.deleteObject(campaignId);

      return true;
    } catch (err) {
      console.log("err: ", err);
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
