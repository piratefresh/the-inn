import { registerEnumType } from 'type-graphql'

export enum CampaignType {
  Campaign = 'Campaign',
  One_Shot = 'One_Shot'
}
registerEnumType(CampaignType, {
    name: 'CampaignType',
})
