import AbstractBackend from '../../../backend/AbstractBackend'
import CodeInterface from '../../../intermediate/CodeInterface'
import SymTabStackInterface from '../../../intermediate/SymTabStackInterface'
import { StatementInterpreter } from './interpreters'

export class CallbackInterpreter extends AbstractBackend
{
  protected static context

  constructor(parent?: AbstractBackend)
  {
    super()
  }

  process(iCode: CodeInterface, symTabStack: SymTabStackInterface | null, context?: any): any
  {
    CallbackInterpreter.context = context
    this.iCode = iCode
    this.symTabStack = symTabStack
    
    const rootNode = iCode.getRoot()
    const statementInterpreter = new StatementInterpreter(this)
    return statementInterpreter.execute(rootNode)
  }
}