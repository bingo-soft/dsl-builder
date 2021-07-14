import CodeNodeInterface from '../../../../intermediate/CodeNodeInterface'
import CodeKeyImpl from '../../../../intermediate/impl/CodeKeyImpl'
import SymTabKeyImpl from '../../../../intermediate/impl/SymTabKeyImpl'
import SymTabEntryImpl from '../../../../intermediate/impl/SymTabEntryImpl'
import { StatementInterpreter, ExpressionInterpreter } from '../interpreters'

export  class AssignmentInterpreter extends StatementInterpreter
{
  execute(node: CodeNodeInterface): any
  {
    const children = node.getChildren()
    const variableNode = children[0]
    const expressionNode = children[1]

    const interpreter = new ExpressionInterpreter(this)
    const value = interpreter.execute(expressionNode)

    const variableId = <SymTabEntryImpl> variableNode.getAttribute(CodeKeyImpl.ID)
    variableId.setAttribute(SymTabKeyImpl.DATA_VALUE, value)
  }

}