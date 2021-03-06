import AbstractBackend from '../../../../backend/AbstractBackend'
import CodeNodeInterface from '../../../../intermediate/CodeNodeInterface'
import CodeNodeTypeImpl from '../../../../intermediate/impl/CodeNodeTypeImpl'
import { CallbackInterpreter, AssignmentInterpreter, ExpressionInterpreter, IfElseInterpreter } from '../interpreters'

export class StatementInterpreter extends CallbackInterpreter
{
  execute(node: CodeNodeInterface): any
  {
    const nodeType = node.getType()
    if (nodeType == CodeNodeTypeImpl.SCRIPT) {
      const children = node.getChildren()
      if (children.length) {
        for (let i = 0; i < children.length; i += 1) {
          const child = children[i]
          const ret = this.executeItem(child)
          if (ret != null) return ret       
        }
      }
    } else {
      const ret = this.executeItem(node)
      if (ret != null) return ret
    }
  }

  protected executeItem(node: CodeNodeInterface): any
  {
    const childType = node.getType()  
    let interpreter
    let ret
    let grandchild
    switch(childType) {
      case CodeNodeTypeImpl.ASSIGN:
        interpreter = new AssignmentInterpreter(this)
        interpreter.execute(node)
        break
      case CodeNodeTypeImpl.IF:
        interpreter = new IfElseInterpreter(this)
        ret = interpreter.execute(node)
        if (ret != null) {
            return ret
        }
        break
      case CodeNodeTypeImpl.RETURN:
        grandchild = node.getChildren()[0]
        interpreter = new ExpressionInterpreter(this)
        return interpreter.execute(grandchild)
      default:
        break
    }
  }

}