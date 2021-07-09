import AbstractBackend from '../../../backend/AbstractBackend'
import CodeInterface from '../../../intermediate/CodeInterface'
/*import SymTabInterface from '../../../intermediate/SymTabInterface'*/
import ExpressionInterpreter from './interpreters/ExpressionInterpreter'

export default class TinyInterpreter extends AbstractBackend
{
  process(iCode: CodeInterface/*, symTab: SymTabInterface | null*/): any
  {
    const rootNode = iCode.getRoot()
    const expressionInterpreter = new ExpressionInterpreter()
    return expressionInterpreter.execute(rootNode)
  }
}