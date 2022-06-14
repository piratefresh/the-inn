import { Field, ObjectType, Int } from 'type-graphql'
import { Stats } from './Stats'
import { Item } from './Item'

@ObjectType()
export class Spell {
  @Field((_type) => Int)
  id: number

  @Field()
  name: string

  @Field()
  description: string

  @Field()
  image: string

  @Field((_type) => Int)
  required_level: number

  @Field()
  casting_time: string

  @Field()
  attack_type: string

  @Field((_type) => Stats)
  save: Stats

  @Field()
  range: string

  @Field()
  statsId: string

  @Field((_type) => Item, { nullable: true })
  Item?: Item

  @Field((_type) => Int, { nullable: true })
  itemId?: number

  // skip overwrite 👇
}