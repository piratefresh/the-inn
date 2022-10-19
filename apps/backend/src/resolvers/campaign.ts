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
import { User } from "@prisma/client";
import { MembershipRole } from "@typedefs/MembershipRole";
import { Experience } from "@typedefs/Experience";

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
  lat: number;
  @Field({ nullable: true })
  lng: number;
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
  voipSystem: string;
  @Field()
  virtualTable: string;
  @Field()
  maxSeats: number;
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
  @Field()
  price: number;
}

@InputType()
export class AddPlayerCampaignInput {
  @Field()
  campaign_id: string;
  @Field(() => [String])
  player_ids: string[];
}

@ObjectType()
class ImageSignature {
  @Field((_type) => String)
  signature!: string;

  @Field((_type) => Int)
  timestamp!: number;
}

@Resolver(Campaign)
export class CampaignResolver {
  @Query(() => String)
  async hellogame() {
    return "hello game";
  }
  @Query(() => [Campaign])
  async getCampaigns(@Ctx() { prisma, res }: MyContext) {
    return prisma.campaign.findMany({});
  }
  @Query(() => Campaign)
  async getCampaign(@Arg("id") id: string, @Ctx() { prisma, res }: MyContext) {
    return prisma.campaign.findUnique({
      where: {
        id,
      },
      include: {
        gameMaster: true,
        memberships: {
          select: {
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
      console.log("req.session.userId: ", req.session);
      console.log("createCampaignInput: ", createCampaignInput);
      const campaign = await prisma.campaign.create({
        data: {
          ...createCampaignInput,
          gameMaster: {
            connect: {
              id: req.session.userId,
            },
          },
        },
      });

      return Object.assign(new Campaign(), campaign);
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
      const members = await prisma.user.findMany({
        where: {
          id: { in: addPlayerCampaignInput.player_ids },
        },
      });

      const playersArr = await members.map((player: User) => ({
        userId: player.id,
        campaignId: addPlayerCampaignInput.campaign_id,
        role: MembershipRole.PLAYER,
      }));

      const createdPlayers = await prisma.membership.createMany({
        data: playersArr,
        skipDuplicates: true,
      });
      if (createdPlayers) {
        const foundCampaign = await prisma.campaign.findUnique({
          where: {
            id: addPlayerCampaignInput.campaign_id,
          },
          include: {
            memberships: {
              select: {
                user: true,
                campaign: true,
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
