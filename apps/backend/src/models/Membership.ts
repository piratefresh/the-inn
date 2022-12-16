import { Field, InputType, ObjectType } from "type-graphql";
import { MembershipRole } from "../typedefs/MembershipRole";
import { User } from "./User";
import { Campaign } from "./Campaign";
import { Application } from "./Application";

@InputType("membershipInput")
@ObjectType()
export class Membership {
  @Field((_type) => MembershipRole)
  role: MembershipRole;

  @Field()
  campaignId: string;

  @Field()
  userId: string;

  @Field((_type) => Campaign)
  campaign: Campaign;

  @Field((_type) => User)
  user: User;

  @Field((_type) => [Application])
  application: Application[];

  // skip overwrite 👇
}
