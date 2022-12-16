import { Experience } from "@typedefs/Experience";
import { Field, InputType } from "type-graphql";

@InputType()
export class CampaignApplicationInput {
  @Field()
  campaignId: string;
  @Field()
  message: string;
  @Field({ nullable: true })
  jsonMessage: string;
  @Field()
  fitsSchedule: boolean;
  @Field(() => [String])
  days: string[];
  @Field(() => [String])
  timePeriods: string[];
  @Field(() => Experience)
  experience: Experience;
}
