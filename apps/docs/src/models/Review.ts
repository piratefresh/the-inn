import { Field, ObjectType, ID, Int } from 'type-graphql'
import { User } from './User'

@ObjectType()
export class Review {
  @Field((_type) => ID)
  id: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field((_type) => Int)
  rating: number

  @Field()
  comment: string

  @Field()
  userId: string

  @Field((_type) => User)
  user: User

  // skip overwrite 👇
}