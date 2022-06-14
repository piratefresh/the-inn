import { Field, ObjectType, ID, Float } from 'type-graphql'
import { Spell } from './Spell'

@ObjectType()
export class Stats {
  @Field((_type) => ID)
  id: string

  @Field()
  name: string

  @Field()
  color: string

  @Field((_type) => Float)
  modifier: number

  @Field((_type) => [Spell])
  Spell: Spell[]

  // skip overwrite 👇
}