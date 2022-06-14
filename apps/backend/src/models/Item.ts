import { Field, ObjectType, Int, Float } from 'type-graphql'
import { Spell } from './Spell'
import { GameSystem } from './GameSystem'

@ObjectType()
export class Item {
  @Field((_type) => Int)
  id: number

  @Field()
  name: string

  @Field((_type) => [String])
  stats: string[]

  @Field((_type) => [String])
  attributes: string[]

  @Field()
  location: string

  @Field((_type) => Float, { nullable: true })
  sell_price?: number

  @Field((_type) => Float, { nullable: true })
  buy_price?: number

  @Field()
  description: string

  @Field((_type) => [Spell])
  spells: Spell[]

  @Field()
  rarity: string

  @Field()
  equipment_slot: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field((_type) => [GameSystem])
  gameSystem: GameSystem[]

  // skip overwrite 👇
}