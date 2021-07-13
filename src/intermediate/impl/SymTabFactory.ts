import SymTabEntryImpl from './SymTabEntryImpl'
import SymTabImpl from './SymTabImpl'
import SymTabInterface from '../SymTabInterface'
import SymTabStackImpl from './SymTabStackImpl'

export default class SymTabFactory
{
  static createSymTabStack(): SymTabStackImpl
  {
    return new SymTabStackImpl()
  }
    
  static createSymTab(nestingLevel: number): SymTabImpl
  {
    return new SymTabImpl(nestingLevel)
  }
    
  static createSymTabEntry(name: string, symTab: SymTabInterface): SymTabEntryImpl
  {
    return new SymTabEntryImpl(name, symTab)
  }
}