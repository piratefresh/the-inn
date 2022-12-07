import { Difficulty } from "@typedefs/Difficulty";
import { Experience } from "@typedefs/Experience";
import { Field, InputType } from "type-graphql";

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
