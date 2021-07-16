import { StatementParser, ExpressionParser }  from '../parsers'
import CodeKeyImpl from '../../../../intermediate/impl/CodeKeyImpl'
import CodeNodeInterface from '../../../../intermediate/CodeNodeInterface'
import CodeNodeTypeImpl from '../../../../intermediate/impl/CodeNodeTypeImpl'
import CodeFactory from '../../../../intermediate/CodeFactory'
import ErrorCode from '../../../../frontend/ErrorCode'
import TokenTypeImpl from '../../../../frontend/tokens/TokenTypeImpl'
import TokenInterface from '../../../../frontend/TokenInterface'

export class AssignmentParser extends StatementParser
{
  parse(token: TokenInterface | null): CodeNodeInterface | null
  {
    const assignNode = CodeFactory.createCodeNode(CodeNodeTypeImpl.ASSIGN)
    const saveToken = token
    const targetName = token.getText()
    let targetId = AssignmentParser.symTabStack.lookup(targetName)   
    
    if (targetId == null) {
      targetId = AssignmentParser.symTabStack.enterLocal(targetName)
    }

    targetId.appendLineNumber(token.getLineNumber())

    token = this.nextToken()
    const variableNode = CodeFactory.createCodeNode(CodeNodeTypeImpl.VARIABLE)
    variableNode.setAttribute(CodeKeyImpl.ID, targetId)
     
    assignNode.addChild(variableNode)
        
    if (token.getType() == TokenTypeImpl.ASSIGN) {
      token = this.nextToken()
    } else {
      AssignmentParser.errorHandler.flag(token, ErrorCode.MISSING_EQUALS_SIGN, this)            
    }
        
    const expressionParser = new ExpressionParser(this.scanner)
    assignNode.addChild(expressionParser.parse(token))
    this.setLineNumber(assignNode, saveToken)
        
    return assignNode
  }
}