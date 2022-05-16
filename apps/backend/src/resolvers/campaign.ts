import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { MyContext } from "@typedefs/MyContext";
import { ExistingUserError } from "@errors/ExisitingUserError";
import { FieldsValidationError } from "@errors/FieldsValidationError";
import { BadCredentialsError } from "@errors/BadCredentialsError";
import { Campaign } from "@models/Campaign";
import { NonExistingCampaignError } from "@errors/NonExistingCampaignError";
import { Experiance } from "@typedefs/Experiance";
import { Difficulty } from "@typedefs/Difficulty";
import { User } from "@models/User";

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
  @Field()
  image: string;
  @Field()
  isOnline: boolean;
  @Field()
  city: string;
  @Field()
  state: string;
  @Field()
  lat: number;
  @Field()
  lng: number;
  @Field()
  startDate: Date;
  @Field()
  endDate: Date;
  @Field(() => [String])
  days: string[];
  @Field(() => [String])
  time_periods: string[];
  @Field()
  game_system: string;
  @Field()
  max_seats: number;
  @Field(() => Experiance)
  experiance: Experiance;
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
  campaignId: string;
  @Field(() => [String])
  playerIds: string[];
}

@Resolver(Campaign)
export class CampaignResolver {
  @FieldResolver(() => User)
  game_master(
    @Root() campaign: Campaign,
    @Ctx() { prisma, res, req }: MyContext
  ) {
    return prisma.user.findUnique({
      where: {
        id: campaign.gmId,
      },
    });
  }
  // @FieldResolver(() => User)
  // players(@Root() campaign: Campaign, @Ctx() { prisma, res, req }: MyContext) {
  //   console.log("players: ", campaign.players);
  //   const playerIds = campaign.players.map((player) => player.id);
  //   return prisma.user.findMany({
  //     where: {
  //       id: { in: playerIds },
  //     },
  //   });
  // }

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
          gmId: req.session.userId,
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
      const players = await prisma.user.findMany({
        where: {
          id: { in: addPlayerCampaignInput.playerIds },
        },
      });

      console.log("players: ", players);

      await prisma.player.createMany({
        data: {
          user: players,
          campaignId: addPlayerCampaignInput.campaignId,
        },
        skipDuplicates: true,
      });

      const foundCampaign = await prisma.campaign.update({
        where: {
          id: addPlayerCampaignInput.campaignId,
        },
        data: {
          players: {},
        },
      });

      console.log("foundCampaign: ", foundCampaign);

      return Object.assign(new Campaign(), foundCampaign);
    } catch (err) {
      throw err;
    }
  }
}
