import SymTabFactory from './SymTabFactory'
import SymTabEntryInterface from '../SymTabEntryInterface'
import SymTabInterface from '../SymTabInterface'

export default class SymTabImpl implements SymTabInterface
{
  private nestingLevel: number

  private map = {}

  constructor(nestingLevel: number)
  {
    this.nestingLevel = nestingLevel
  }

  getNestingLevel(): number
  {
    return this.nestingLevel
  }

  enter(name: string): SymTabEntryInterface
  {
    const entry = SymTabFactory.createSymTabEntry(name, this)
    this.map[name] = entry
    return entry
  }
    
  lookup(name: string): any
  {
    return Object.prototype.hasOwnProperty.call(this.map, name) ? this.map[name] : null
  }
    
  sortedEntries(): any
  {
    return Object.keys(this.map).sort().reduce(
      (obj, key) => {
        obj[key] = this.map[key]
        return obj
      }, 
      {}
    )
  }

}