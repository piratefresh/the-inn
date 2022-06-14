import { Field, ObjectType, ID } from 'type-graphql'
import { Experience } from '../typedefs/Experience'
import { StatusType } from '../typedefs/StatusType'
import { Account } from './Account'
import { Session } from './Session'
import { Review } from './Review'
import { Campaign } from './Campaign'
import { Membership } from './Membership'

@ObjectType()
export class User {
  @Field((_type) => ID)
  id: string

  @Field()
  password: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  emailVerified?: Date

  @Field({ nullable: true })
  image?: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field((_type) => Experience)
  experience: Experience

  @Field({ nullable: true })
  twitter?: string

  @Field({ nullable: true })
  facebook?: string

  @Field({ nullable: true })
  discord?: string

  @Field({ nullable: true })
  youtube?: string

  @Field((_type) => StatusType)
  status: StatusType

  @Field((_type) => [Account])
  accounts: Account[]

  @Field((_type) => [Session])
  sessions: Session[]

  @Field((_type) => [Review])
  reviews: Review[]

  @Field((_type) => [Campaign])
  Hosted: Campaign[]

  @Field((_type) => [Membership])
  memberships: Membership[]

  // skip overwrite 👇
}