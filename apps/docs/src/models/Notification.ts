import { Field, ObjectType, ID } from 'type-graphql'
import { NotificationType } from '../typedefs/NotificationType'
import { User } from './User'

@ObjectType()
export class Notification {
  @Field((_type) => ID)
  id: string

  @Field()
  message: string

  @Field((_type) => NotificationType)
  type: NotificationType

  @Field()
  relatedId: string

  @Field((_type) => User)
  user: User

  @Field()
  userId: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field()
  read: boolean

  // skip overwrite 👇
}