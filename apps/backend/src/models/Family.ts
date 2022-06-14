import { Field, ObjectType, ID } from 'type-graphql'
import { Npc } from './Npc'

@ObjectType()
export class Family {
  @Field((_type) => ID)
  id: string

  @Field()
  description: string

  @Field()
  type: string

  @Field((_type) => [String])
  stats: string[]

  @Field((_type) => [String])
  attributes: string[]

  @Field((_type) => [Npc])
  Npc: Npc[]

  // skip overwrite 👇
}