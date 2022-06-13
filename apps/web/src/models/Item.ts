import { Field, ObjectType, ID, Float, Int } from 'type-graphql'
import { Campaign } from './Campaign'

@ObjectType()
export class Item {
  @Field((_type) => ID)
  id: string

  @Field()
  name: string

  @Field((_type) => [String])
  stats: string[]

  @Field((_type) => Float, { nullable: true })
  sell_price?: number

  @Field((_type) => Float, { nullable: true })
  buy_price?: number

  @Field()
  description: string

  @Field((_type) => [Campaign])
  Campaign: Campaign[]

  @Field((_type) => Int)
  campaignId: number

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  // skip overwrite 👇