import { registerEnumType } from 'type-graphql'

export enum Experiance {
  Beginner = 'Beginner',
  Advanced = 'Advanced',
  All = 'All'
}
registerEnumType(Experiance, {
    name: 'Experiance',
})
