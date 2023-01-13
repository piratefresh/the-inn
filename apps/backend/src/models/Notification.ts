import { Field, ObjectType, ID, InputType } from "type-graphql";
import { DateTimeResolver } from "graphql-scalars";
import { NotificationType } from "../typedefs/NotificationType";
import { User } from "./User";

// This fixes the "duplicate scalar name" error
DateTimeResolver.name = "DateTimeResolver";

@InputType("notificationInput")
@ObjectType()
export class Notification {
  @Field((_type) => ID)
  id: string;

  @Field()
  message: string;

  @Field((_type) => NotificationType)
  type: NotificationType;

  @Field()
  relatedId: string;

  @Field((_type) => User)
  user: User;

  @Field()
  userId: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  read: boolean;

  // skip overwrite 👇
}
