import { Field, ObjectType, ID, Int } from 'type-graphql'
import { Campaign } from './Campaign'
import { User } from './User'

@ObjectType()
export class Domain {
  @Field((_type) => ID)
  domain: string

  @Field()
  isValid: boolean

  @Field((_type) => [Campaign])
  Campaign: Campaign[]

  @Field((_type) => Int)
  campaignId: number

  @Field((_type) => User, { nullable: true })
  User?: User

  @Field({ nullable: true })
  userId?: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  // skip overwrite 👇