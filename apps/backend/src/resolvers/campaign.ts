import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { MyContext } from "@typedefs/MyContext";
import { FieldsValidationError } from "@errors/FieldsValidationError";
import { BadCredentialsError } from "@errors/BadCredentialsError";
import { Campaign } from "@models/Campaign";
import { NonExistingCampaignError } from "@errors/NonExistingCampaignError";
import { Difficulty } from "@typedefs/Difficulty";
import { v2 as cloudinary } from "cloudinary";
import { MembershipRole } from "@typedefs/MembershipRole";
import { Experience } from "@typedefs/Experience";
import { CampaignType } from "@typedefs/CampaignType";

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
export class CreateCampaignInput {
  @Field()
  title: string;
  @Field()
  summary: string;
  @Field({ nullable: true })
  jsonSummary: string;
  @Field()
  additionalDetails: string;
  @Field({ nullable: true })
  jsonAdditionalDetails: string;
  @Field()
  imageUrl: string;
  @Field()
  isOnline: boolean;
  @Field({ nullable: true })
  city: string;
  @Field({ nullable: true })
  state: string;
  @Field({ nullable: true })
  area: string;
  @Field({ nullable: true })
  lat: number;
  @Field({ nullable: true })
  lng: number;
  @Field({ nullable: true })
  virtualTable: string;
  @Field({ nullable: true })
  voipSystem: string;
  @Field()
  startDate: Date;
  @Field({ nullable: true })
  endDate: Date;
  @Field(() => [String])
  days: string[];
  @Field(() => [String])
  timePeriods: string[];
  @Field()
  timezone: string;
  @Field()
  gameSystem: string;
  @Field()
  maxSeats: number;

  @Field({ defaultValue: "Campaign" })
  campaignType: string;
  @Field(() => Experience)
  experience: Experience;
  @Field(() => Difficulty)
  puzzles: Difficulty;
  @Field(() => Difficulty)
  combat: Difficulty;
  @Field(() => Difficulty)
  roleplay: Difficulty;

  @Field(() => [String])
  tags: string[];
  @Field({ nullable: true })
  price: number;
}

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
    console.log("req.session.userId CAMPAIGN RESOLVER: ", req.session);
    const user = await redis.get("sess:3BVczvIrYbEd58T-K_0plkK_c6Wh7S8U");

    return prisma.campaign.findMany({
      orderBy: {
        updatedAt: "desc",
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

      console.log(lastPostInResults);
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
          },
        },
      },
    });
  }

  @Mutation((_type) => CreateCampaignResult)
  async createCampaign(
    @Arg("createCampaignInput") createCampaignInput: CreateCampaignInput,
    @Ctx() { prisma, res, req }: MyContext
  ) {
    try {
      console.log(createCampaignInput);
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
      "WLq6q-U8gvxsbOBnjOIoR7PzINo"
    );
    return { timestamp, signature };
  }
}
