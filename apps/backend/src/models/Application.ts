import { Field, ObjectType, ID } from 'type-graphql'
import { Membership } from './Membership'

@ObjectType()
export class Application {
  @Field((_type) => ID)
  id: string

  @Field((_type) => Membership)
  membership: Membership

  @Field()
  membershipId: string

  @Field()
  campaignId: string

  @Field()
  userId: string

  @Field()
  message: string

  @Field()
  jsonMessage: string

  @Field()
  fitsSchedule: boolean

  @Field((_type) => [String])
  days: string[]

  @Field((_type) => [String])
  timePeriods: string[]

  // skip overwrite 👇
}