import SymTabFactory from './SymTabFactory'
import SymTabInterface from '../SymTabInterface'
import SymTabStackInterface from '../SymTabStackInterface'

export default class SymTabStackImpl implements SymTabStackInterface
{
  private currentNestingLevel: number

  private symTabs = []

  constructor()
  {
    this.currentNestingLevel = 0
    this.symTabs.push(
      SymTabFactory.createSymTab(this.currentNestingLevel)
    )
  }

  getCurrentNestingLevel(): number
  {
    return this.currentNestingLevel
  }
    
  getLocalSymTab(): SymTabInterface
  {
    return this.symTabs[this.currentNestingLevel]
  }
      
  enterLocal(name: string): void
  {
    this.symTabs[this.currentNestingLevel].enter(name)
  }
      
  lookupLocal(name: string): any
  {
    return this.symTabs[this.currentNestingLevel].lookup(name)
  }
      
  lookup(name: string): any
  {
    return this.lookupLocal(name)
  }
}