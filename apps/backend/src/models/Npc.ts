import { Field, ObjectType, Int } from 'type-graphql'
import { Family } from './Family'
import { GameSystem } from './GameSystem'

@ObjectType()
export class Npc {
  @Field((_type) => Int)
  id: number

  @Field()
  name: string

  @Field((_type) => [String])
  stats: string[]

  @Field()
  location: string

  @Field()
  description: string

  @Field((_type) => Family)
  family: Family

  @Field((_type) => Int)
  campaignId: number

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field()
  familyId: string

  @Field((_type) => [GameSystem])
  gameSystem: GameSystem[]

  // skip overwrite 👇
}