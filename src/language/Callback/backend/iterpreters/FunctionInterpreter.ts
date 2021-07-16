import CodeNodeInterface from '../../../../intermediate/CodeNodeInterface'
import CodeKeyImpl from '../../../../intermediate/impl/CodeKeyImpl'
import CodeNodeTypeImpl from '../../../../intermediate/impl/CodeNodeTypeImpl'
import SymTabEntryImpl from '../../../../intermediate/impl/SymTabEntryImpl'
import SymTabKeyImpl from '../../../../intermediate/impl/SymTabKeyImpl'
import { StatementInterpreter, ExpressionInterpreter } from '../interpreters'

export class FunctionInterpreter extends StatementInterpreter
{
  execute(node: CodeNodeInterface): any
  {
    const functionType = node.getAttribute(CodeKeyImpl.VALUE)
    switch(functionType) {
      case 'includes':
        return this.executeIncludes(node)
      case 'json':
        return this.executeJson(node)
    }
    return null
  }

  executeIncludes(node: CodeNodeInterface): any
  {
    const interpreter = new ExpressionInterpreter(this)
    const children = node.getChildren()
    const firstNodeValue = interpreter.execute(children[0])
    if (typeof firstNodeValue == 'string' || firstNodeValue instanceof String) {
      return String.prototype.includes.call(firstNodeValue, interpreter.execute(children[1]))
    }
    return null
  }

  executeJson(node: CodeNodeInterface): any
  {
    const interpreter = new ExpressionInterpreter(this)
    const children = node.getChildren()
    return JSON.parse(interpreter.execute(children[0]))
  }
}