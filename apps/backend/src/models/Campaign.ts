import { Field, ObjectType, ID, Float, Int, InputType } from "type-graphql";
import { Experience } from "../typedefs/Experience";
import { Difficulty } from "../typedefs/Difficulty";
import { User } from "./User";
import { Membership } from "./Membership";
import { CampaignMessage } from "./CampaignMessage";

@InputType("campaignInput")
@ObjectType()
export class Campaign {
  @Field((_type) => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  title: string;

  @Field()
  summary: string;

  @Field()
  jsonSummary: string;

  @Field({ nullable: true })
  additionalDetails?: string;

  @Field({ nullable: true })
  jsonAdditionalDetails?: string;

  @Field({ nullable: true })
  note?: string;

  @Field()
  imageUrl: string;

  @Field()
  isOnline: boolean;

  @Field({ defaultValue: "Campaign" })
  campaignType: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  state?: string;

  @Field({ nullable: true })
  area?: string;

  @Field((_type) => Float, { nullable: true })
  lat?: number;

  @Field((_type) => Float, { nullable: true })
  lng?: number;

  @Field()
  startDate: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field((_type) => [String])
  days: string[];

  @Field((_type) => [String])
  timePeriods: string[];

  @Field()
  timezone: string;

  @Field()
  gmId: string;

  @Field((_type) => Experience)
  experience: Experience;

  @Field({ nullable: true })
  voipSystem?: string;

  @Field()
  gameSystem: string;

  @Field({ nullable: true })
  virtualTable?: string;

  @Field((_type) => Int)
  maxSeats: number;

  @Field()
  isActive: boolean;

  @Field((_type) => Difficulty)
  puzzles: Difficulty;

  @Field((_type) => Difficulty)
  combat: Difficulty;

  @Field((_type) => Difficulty)
  roleplay: Difficulty;

  @Field((_type) => [String])
  tags: string[];

  @Field((_type) => Float, { nullable: true })
  price?: number;

  @Field((_type) => [String])
  gallery: string[];

  @Field((_type) => User)
  gameMaster: User;

  @Field((_type) => [Membership])
  memberships: Membership[];

  @Field((_type) => [CampaignMessage], { nullable: true })
  campaignMessage: CampaignMessage[];

  // skip overwrite 👇
}
