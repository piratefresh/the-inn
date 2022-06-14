import { Field, ObjectType, ID, Float, Int } from 'type-graphql'
import { Experience } from '../typedefs/Experience'
import { Difficulty } from '../typedefs/Difficulty'
import { User } from './User'
import { Membership } from './Membership'
import { GameSystem } from './GameSystem'

@ObjectType()
export class Campaign {
  @Field((_type) => ID)
  id: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field()
  title: string

  @Field()
  summary: string

  @Field({ nullable: true })
  additional_details?: string

  @Field({ nullable: true })
  note?: string

  @Field()
  image: string

  @Field()
  isOnline: boolean

  @Field()
  city: string

  @Field()
  state: string

  @Field((_type) => Float)
  lat: number

  @Field((_type) => Float)
  lng: number

  @Field()
  startDate: Date

  @Field()
  endDate: Date

  @Field((_type) => [String])
  days: string[]

  @Field((_type) => [String])
  time_periods: string[]

  @Field((_type) => Experience)
  experience: Experience

  @Field({ nullable: true })
  voip_system?: string

  @Field((_type) => Int)
  max_seats: number

  @Field((_type) => Difficulty)
  puzzles: Difficulty

  @Field((_type) => Difficulty)
  combat: Difficulty

  @Field((_type) => Difficulty)
  roleplay: Difficulty

  @Field()
  gmId: string

  @Field((_type) => User)
  game_master: User

  @Field((_type) => [String])
  tags: string[]

  @Field((_type) => Float, { nullable: true })
  price?: number

  @Field((_type) => [Membership])
  memberships: Membership[]

  @Field((_type) => [GameSystem])
  GameSystem: GameSystem[]

  // skip overwrite 👇
}