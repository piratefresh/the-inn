import { Field, ObjectType, Int } from 'type-graphql'
import { Campaign } from './Campaign'
import { User } from './User'

@ObjectType()
export class Player {
  @Field((_type) => Int)
  id: number

  @Field((_type) => Campaign)
  campaign: Campaign

  @Field((_type) => User)
  user: User

  @Field()
  campaignId: string

  @Field()
  userId: string

  // skip overwrite 👇