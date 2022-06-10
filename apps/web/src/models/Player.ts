import { Field, ObjectType } from 'type-graphql'
import { User } from './User'
import { Campaign } from './Campaign'

@ObjectType()
export class Player {
  @Field()
  campaignId: string

  @Field()
  userId: string

  @Field((_type) => User)
  user: User

  @Field((_type) => Campaign)
  campaign: Campaign

  // skip overwrite 👇