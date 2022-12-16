import { registerEnumType } from 'type-graphql'

export enum Experience {
  Beginner = 'Beginner',
  Advanced = 'Advanced',
  All = 'All'
}
registerEnumType(Experience, {
    name: 'Experience',
})
