import { Field, ObjectType, ID, InputType } from "type-graphql";
import { Experience } from "../typedefs/Experience";
import { StatusType } from "../typedefs/StatusType";
import { Account } from "./Account";
import { Session } from "./Session";
import { Review } from "./Review";
import { Campaign } from "./Campaign";
import { Membership } from "./Membership";
import { CampaignMessage } from "./CampaignMessage";
import { PrivateMessage } from "./PrivateMessage";
import { Notification } from "./Notification";
import { Application } from "./Application";

@InputType("UserInput")
@ObjectType("User", {
  isAbstract: true,
})
export class User {
  @Field((_type) => ID)
  id: string;

  @Field()
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  email: string;

  @Field({ nullable: true })
  emailVerified?: Date;

  @Field({ nullable: true })
  emailVerifyToken?: string;

  @Field({ nullable: true })
  passwordResetToken?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  aboutMe?: string;

  @Field({ nullable: true })
  htmlAboutMe?: string;

  @Field((_type) => Experience)
  experience: Experience;

  @Field({ nullable: true })
  twitter?: string;

  @Field({ nullable: true })
  facebook?: string;

  @Field({ nullable: true })
  discord?: string;

  @Field({ nullable: true })
  youtube?: string;

  @Field({ nullable: true })
  instagram?: string;

  @Field({ nullable: true })
  twitch?: string;

  @Field((_type) => [String])
  tags: string[];

  @Field({ nullable: true })
  profileCSS?: string;

  @Field((_type) => StatusType)
  status: StatusType;

  @Field((_type) => [Membership])
  memberships: Membership[];

  @Field((_type) => [Account])
  accounts: Account[];

  @Field((_type) => [Campaign])
  hosted: Campaign[];

  @Field((_type) => [Review])
  reviews: Review[];

  @Field((_type) => [Session])
  sessions: Session[];

  @Field((_type) => [CampaignMessage])
  sentCampaignMessage: CampaignMessage[];

  @Field((_type) => [PrivateMessage])
  sentPrivateMessages: PrivateMessage[];

  @Field((_type) => [PrivateMessage])
  receivedPrivateMessage: PrivateMessage[];

  @Field((_type) => [Notification])
  Notification: Notification[];

  @Field((_type) => [Application])
  Application: Application[];

  // skip overwrite 👇
}
