import { Field, ObjectType, ID, Int } from 'type-graphql'
import { Campaign } from './Campaign'
import { Item } from './Item'
import { Npc } from './Npc'

@ObjectType()
export class GameSystem {
  @Field((_type) => ID)
  id: string

  @Field((_type) => Campaign)
  campaign: Campaign

  @Field()
  campaignId: string

  @Field((_type) => Item, { nullable: true })
  item?: Item

  @Field((_type) => Int, { nullable: true })
  itemId?: number

  @Field((_type) => Npc, { nullable: true })
  npc?: Npc

  @Field((_type) => Int, { nullable: true })
  npcId?: number

  @Field()
  assignedAt: Date

  @Field()
  assignedBy: string

  // skip overwrite 👇
}