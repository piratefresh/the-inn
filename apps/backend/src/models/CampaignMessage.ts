import { Field, ObjectType, ID, Int } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class CampaignMessage {
  @Field((_type) => ID)
  id: string;
  @Field()
  message: string;
  @Field((_type) => User)
  sender: User;
  @Field((_type) => User)
  recipient: User;
  @Field()
  senderId: string;
  @Field()
  recipientId: string;
  @Field()
  hasAttachment: boolean;
  @Field()
  attachmentType: string;
  @Field()
  attachmentPending: boolean;
  @Field()
  attachmentError: boolean;
  @Field()
  attachmentKey: string;

  // skip overwrite 👇
}
