import { registerEnumType } from 'type-graphql'

export enum Difficulty {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Any = 'Any'
}
registerEnumType(Difficulty, {
    name: 'Difficulty',
})
