import SymTabEntryInterface from './SymTabEntryInterface'

export default interface SymTabInterface {
  getNestingLevel(): number

  enter(name: string): SymTabEntryInterface

  lookup(name: string): any

  sortedEntries(): any
}