import { Field, ObjectType, ID, Int } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class PrivateMessage {
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
  @Field({ nullable: true })
  hasAttachment: boolean;
  @Field({ nullable: true })
  attachmentType: string;
  @Field({ nullable: true })
  attachmentPending: boolean;
  @Field({ nullable: true })
  attachmentError: boolean;
  @Field({ nullable: true })
  attachmentKey: string;

  // skip overwrite 👇
}
