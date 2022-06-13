import { registerEnumType } from 'type-graphql'

export enum MembershipRole {
  GM = 'GM',
  PLAYER = 'PLAYER'
}
registerEnumType(MembershipRole, {
    name: 'MembershipRole',
})
