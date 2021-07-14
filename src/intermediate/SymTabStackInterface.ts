import SymTabEntryInterface from './SymTabEntryInterface'
import SymTabInterface from './SymTabInterface'

export default interface SymTabStackInterface
{
  getCurrentNestingLevel(): number
    
  getLocalSymTab(): SymTabInterface
    
  enterLocal(name: string): SymTabEntryInterface
    
  lookupLocal(name: string): any
    
  lookup(name: string): any
}