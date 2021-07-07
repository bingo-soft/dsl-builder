import SymTabInterface from './SymTabInterface'
import SymTabKeyInterface from './SymTabKeyInterface'

export default interface SymTabEntryInterface
{
  type: 'SymTabEntry'

  getName(): string;
    
  getSymTab(): SymTabInterface
    
  appendLineNumber(lineNumber: number): void
    
  getLineNumbers(): number[]
    
  setAttribute(key: SymTabKeyInterface, value: unknown): void
    
  getAttribute(key: SymTabKeyInterface): unknown
}
