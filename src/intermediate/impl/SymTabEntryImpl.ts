import SymTabInterface from '../SymTabInterface'
import SymTabEntryInterface from '../SymTabEntryInterface'

export default class SymTabEntryImpl implements SymTabEntryInterface
{
  type: 'SymTabEntry'

  private name: string

  private symTab: SymTabInterface

  private listNumbers: number[] = []

  private map = {}

  constructor(name: string, symTab: SymTabInterface)
  {
    this.name = name
    this.symTab = symTab
  }
  
  getName(): string
  {
    return this.name
  }
    
  getSymTab(): SymTabInterface
  {
    return this.symTab
  }
      
  appendLineNumber(lineNumber: number): void
  {
    this.listNumbers.push(lineNumber)
  }
      
  getLineNumbers(): number[]
  {
    return this.listNumbers
  }
      
  setAttribute(key: string, value: any): void
  {
    this.map[key] = value
  }
      
  getAttribute(key: string): any
  {
    return this.map[key]
  }

}