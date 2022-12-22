import { Field, ObjectType, ID } from 'type-graphql'
import { Experience } from '../typedefs/Experience'
import { StatusType } from '../typedefs/StatusType'
import { Membership } from './Membership'
import { Account } from './Account'
import { Campaign } from './Campaign'
import { Review } from './Review'
import { Session } from './Session'
import { CampaignMessage } from './CampaignMessage'
import { PrivateMessage } from './PrivateMessage'
import { Notification } from './Notification'

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

  @Field()
  email: string

  @Field({ nullable: true })
  emailVerified?: Date

  @Field({ nullable: true })
  emailVerifyToken?: string

  @Field({ nullable: true })
  passwordResetToken?: string

  @Field({ nullable: true })
  imageUrl?: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field({ nullable: true })
  aboutMe?: string

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

  @Field((_type) => [Membership])
  memberships: Membership[]

  @Field((_type) => [Account])
  accounts: Account[]

  @Field((_type) => [Campaign])
  hosted: Campaign[]

  @Field((_type) => [Review])
  reviews: Review[]

  @Field((_type) => [Session])
  sessions: Session[]

  @Field((_type) => [CampaignMessage])
  sentCampaignMessage: CampaignMessage[]

  @Field((_type) => [PrivateMessage])
  sentPrivateMessages: PrivateMessage[]

  @Field((_type) => [PrivateMessage])
  receivedPrivateMessage: PrivateMessage[]

  @Field((_type) => [Notification])
  Notification: Notification[]

  // skip overwrite 👇