import { registerEnumType } from 'type-graphql'

export enum StatusType {
  ONLINE = 'ONLINE',
  IDLE = 'IDLE',
  DND = 'DND',
  OFFLINE = 'OFFLINE'
}
registerEnumType(StatusType, {
    name: 'StatusType',
})
