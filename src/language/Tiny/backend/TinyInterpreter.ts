import AbstractBackend from '../../../backend/AbstractBackend'
import CodeInterface from '../../../intermediate/CodeInterface'
import SymTabStackInterface from '../../../intermediate/SymTabStackInterface'
import { ExpressionInterpreter } from './interpreters'

export class TinyInterpreter extends AbstractBackend
{
  process(iCode: CodeInterface, symTabStack: SymTabStackInterface | null): any
  {
    const rootNode = iCode.getRoot()
    const expressionInterpreter = new ExpressionInterpreter()
    return expressionInterpreter.execute(rootNode)
  }
}