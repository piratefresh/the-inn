import { Field, ObjectType, ID, Int } from "type-graphql";
import { Membership } from "./Membership";
import { Experience } from "../typedefs/Experience";
import { User } from "./User";

@ObjectType()
export class Application {
  @Field((_type) => ID)
  id: string;

  @Field((_type) => Membership)
  membership: Membership;

  @Field()
  membershipId: string;

  @Field()
  campaignId: string;

  @Field()
  userId: string;

  @Field((_type) => User)
  user: User;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field((_type) => Int)
  gamesPlayed: number;

  @Field()
  message: string;

  @Field()
  jsonMessage: string;

  @Field()
  fitsSchedule: boolean;

  @Field((_type) => [String])
  days: string[];

  @Field((_type) => [String])
  timePeriods: string[];

  @Field((_type) => Experience)
  experience: Experience;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // skip overwrite 👇
}
