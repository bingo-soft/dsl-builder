import CodeNodeInterface from '../../../../intermediate/CodeNodeInterface'
import CodeKeyImpl from '../../../../intermediate/impl/CodeKeyImpl'
import CodeNodeTypeImpl from '../../../../intermediate/impl/CodeNodeTypeImpl'
import SymTabEntryImpl from '../../../../intermediate/impl/SymTabEntryImpl'
import SymTabKeyImpl from '../../../../intermediate/impl/SymTabKeyImpl'
import { StatementInterpreter, FunctionInterpreter } from '../interpreters'

export class ExpressionInterpreter extends StatementInterpreter
{
  execute(node: CodeNodeInterface): any
  {
    const nodeType = node.getType()
    if (nodeType == CodeNodeTypeImpl.SCRIPT) {
      const children = node.getChildren()
      return this.executeItem(children[0])
    } else {
      return this.executeItem(node)
    }
  }

  protected executeItem(node: CodeNodeInterface): any
  {
    const nodeType = node.getType()
    if (CodeNodeTypeImpl.isArithmetic(nodeType)) {
      const children = node.getChildren()
      if (nodeType == CodeNodeTypeImpl.ADD) {
        return ( this.execute(children[0]) + this.execute(children[1]))
      } else if (nodeType == CodeNodeTypeImpl.SUBTRACT) {
        return ( this.execute(children[0]) - this.execute(children[1]))
      } else if (nodeType == CodeNodeTypeImpl.MULTIPLY) {
        return ( this.execute(children[0]) * this.execute(children[1]))
      } else if (nodeType == CodeNodeTypeImpl.DIVIDE) {
        return ( this.execute(children[0]) / this.execute(children[1]))
      }
    } else if (CodeNodeTypeImpl.isLogic(nodeType)) {
      const children = node.getChildren()  
      if (nodeType == CodeNodeTypeImpl.AND) {
        return ( this.execute(children[0]) && this.execute(children[1]))
      } else if (nodeType == CodeNodeTypeImpl.OR) {
        return ( this.execute(children[0]) || this.execute(children[1]))
      } 
    } else if (CodeNodeTypeImpl.isRelation(nodeType)) {
      const children = node.getChildren()
      if (nodeType == CodeNodeTypeImpl.EQ) {
        return ( this.execute(children[0]) == this.execute(children[1]))
      } else if (nodeType == CodeNodeTypeImpl.NE) {
        return ( this.execute(children[0]) != this.execute(children[1]))
      } else if (nodeType == CodeNodeTypeImpl.LT) {
        return ( this.execute(children[0]) < this.execute(children[1]))
      } else if (nodeType == CodeNodeTypeImpl.LE) {
        return ( this.execute(children[0]) <= this.execute(children[1]))
      } else if (nodeType == CodeNodeTypeImpl.GT) {
        return ( this.execute(children[0]) > this.execute(children[1]))
      } else if (nodeType == CodeNodeTypeImpl.GE) {
        return ( this.execute(children[0]) >= this.execute(children[1]))
      }
    } else if (CodeNodeTypeImpl.isBoolean(nodeType)) {
      return JSON.parse(node.getAttribute(CodeKeyImpl.VALUE))
    } else if (nodeType == CodeNodeTypeImpl.FLOAT) {
      return parseFloat(node.getAttribute(CodeKeyImpl.VALUE))
    } else if (nodeType == CodeNodeTypeImpl.INTEGER) {
      return parseInt(node.getAttribute(CodeKeyImpl.VALUE))
    } else if (nodeType == CodeNodeTypeImpl.VARIABLE) {
      const variableId = <SymTabEntryImpl> node.getAttribute(CodeKeyImpl.ID)
      return variableId.getAttribute(SymTabKeyImpl.DATA_VALUE)
    } else if (nodeType == CodeNodeTypeImpl.FUNCTION) {
      const interpreter = new FunctionInterpreter(this)
      return interpreter.execute(node)
    } else {
      return node.getAttribute(CodeKeyImpl.VALUE)
    }
  }
}