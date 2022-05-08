import { Field, ObjectType, ID } from "type-graphql";
import { StatusType } from "../types/StatusType";
import { Account } from "./Account";
import { Session } from "./Session";
import { Review } from "./Review";
import { Campaign } from "./Campaign";

@ObjectType()
export class User {
  @Field(() => String)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  emailVerified?: Date;

  @Field({ nullable: true })
  image?: string;

  @Field()
  name: string;

  @Field()
  experience: string;

  @Field({ nullable: true })
  twitter?: string;

  @Field({ nullable: true })
  facebook?: string;

  @Field({ nullable: true })
  discord?: string;

  @Field({ nullable: true })
  youtube?: string;

  @Field(() => StatusType)
  status: StatusType;

  @Field(() => [Account])
  accounts: Account[];

  @Field(() => [Session])
  sessions: Session[];

  @Field(() => [Review])
  reviews: Review[];

  @Field(() => [Campaign])
  Campaign: Campaign[];

  @Field(() => [Campaign])
  Hosted: Campaign[];

  @Field({ nullable: true })
  campaignId?: string;

  // skip overwrite 👇
}
