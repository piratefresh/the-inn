import { Field, ObjectType, ID } from 'type-graphql'
import { User } from './User'
import { Campaign } from './Campaign'

@ObjectType()
export class CampaignMessage {
  @Field()
  message: string

  @Field((_type) => ID)
  id: string

  @Field((_type) => User, { nullable: true })
  sender?: User

  @Field({ nullable: true })
  senderId?: string

  @Field((_type) => Campaign)
  campaign: Campaign

  @Field()
  campaignId: string

  @Field()
  hasAttachment: boolean

  @Field({ nullable: true })
  attachmentType?: string

  @Field({ nullable: true })
  attachmentPending?: boolean

  @Field({ nullable: true })
  attachmentError?: boolean

  @Field({ nullable: true })
  attachmentKey?: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  // skip overwrite 👇
}