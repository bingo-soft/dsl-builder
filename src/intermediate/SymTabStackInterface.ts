import SymTabInterface from './SymTabInterface'

export default interface SymTabStackInterface
{
  getCurrentNestingLevel(): number
    
  getLocalSymTab(): SymTabInterface
    
  enterLocal(name: string): void
    
  lookupLocal(name: string): any
    
  lookup(name: string): any
}