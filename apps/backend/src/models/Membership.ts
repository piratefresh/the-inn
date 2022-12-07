import { Field, InputType, ObjectType } from "type-graphql";
import { MembershipRole } from "../typedefs/MembershipRole";
import { User } from "./User";
import { Campaign } from "./Campaign";

@InputType("membershipInput")
@ObjectType()
export class Membership {
  @Field((_type) => MembershipRole)
  role: MembershipRole;

  @Field()
  campaignId: string;

  @Field()
  userId: string;

  @Field((_type) => User)
  user: User;

  @Field((_type) => Campaign)
  campaign: Campaign;

  @Field({ nullable: true })
  application: string;

  @Field({ nullable: true })
  jsonApplication: string;

  // skip overwrite 👇
}
