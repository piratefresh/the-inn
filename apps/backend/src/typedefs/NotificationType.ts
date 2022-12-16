import { registerEnumType } from 'type-graphql'

export enum NotificationType {
  Campaign = 'Campaign',
  Message = 'Message',
  PrivateMessage = 'PrivateMessage'
}
registerEnumType(NotificationType, {
    name: 'NotificationType',
})
