import CodeNodeInterface from '../../../../intermediate/CodeNodeInterface'
import CodeKeyImpl from '../../../../intermediate/impl/CodeKeyImpl'
import CodeNodeTypeImpl from '../../../../intermediate/impl/CodeNodeTypeImpl'
import SymTabEntryImpl from '../../../../intermediate/impl/SymTabEntryImpl'
import SymTabKeyImpl from '../../../../intermediate/impl/SymTabKeyImpl'
import { StatementInterpreter, ExpressionInterpreter } from '../interpreters'

export class IfElseInterpreter extends StatementInterpreter
{
  execute(node: CodeNodeInterface): any
  {
    const children = node.getChildren()    
    const exprInterpreter = new ExpressionInterpreter(this)

    if ((node.getType() == CodeNodeTypeImpl.IF || node.getType() == CodeNodeTypeImpl.ELSEIF) && exprInterpreter.execute(children[0])) {
      for (let i = 1; i < children.length; i += 1) {
        const stmtInterpreter = new StatementInterpreter(this)
        const ret = stmtInterpreter.executeItem(children[i])
        if (ret != null) {
          return ret
        }
      } 
    } else if (node.getType() == CodeNodeTypeImpl.ELSE) {
      for (let i = 0; i < children.length; i += 1) {
        const stmtInterpreter = new StatementInterpreter(this)
        const ret = stmtInterpreter.executeItem(children[i])
        if (ret != null) {
          return ret
        }
      }
    } else {
      for (let i = 1; i < children.length; i += 1) {
        const node = children[i]
        if (node.getType() == CodeNodeTypeImpl.ELSE) {
          const ret = this.execute(node)
          if (ret != null) {
            return ret
          }
        } else if (node.getType() == CodeNodeTypeImpl.ELSEIF) {
          const ret = this.execute(node)
          if (ret != null) {
            return ret
          }
        }
      }
    }
    
    return null
  }
}