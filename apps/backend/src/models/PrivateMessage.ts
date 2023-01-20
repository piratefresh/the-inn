import { Field, ObjectType, ID, InputType } from "type-graphql";
import { User } from "./User";

@InputType("privateMessage")
@ObjectType()
export class PrivateMessage {
  @Field()
  message: string;

  @Field((_type) => ID)
  id: string;

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

  @Field({ nullable: true })
  attachmentType?: string;

  @Field({ nullable: true })
  attachmentPending?: boolean;

  @Field({ nullable: true })
  attachmentError?: boolean;

  @Field({ nullable: true })
  attachmentKey?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // skip overwrite 👇
}
