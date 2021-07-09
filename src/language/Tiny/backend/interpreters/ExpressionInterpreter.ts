import CodeNodeInterface from '../../../../intermediate/CodeNodeInterface'
import CodeKeyImpl from '../../../../intermediate/impl/CodeKeyImpl'
import CodeNodeTypeImpl from '../../../../intermediate/impl/CodeNodeTypeImpl'

export default class ExpressionInterpreter
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

  private executeItem(node: CodeNodeInterface): any
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
    } else if (nodeType == CodeNodeTypeImpl.FLOAT) {
      return parseFloat(node.getAttribute(CodeKeyImpl.VALUE))
    } else if (nodeType == CodeNodeTypeImpl.INTEGER) {
      return parseInt(node.getAttribute(CodeKeyImpl.VALUE))
    }
  }

}