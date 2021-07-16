import { StatementParser, ExpressionParser }  from '../parsers'
import CodeKeyImpl from '../../../../intermediate/impl/CodeKeyImpl'
import CodeNodeInterface from '../../../../intermediate/CodeNodeInterface'
import CodeNodeTypeImpl from '../../../../intermediate/impl/CodeNodeTypeImpl'
import CodeFactory from '../../../../intermediate/CodeFactory'
import ErrorCode from '../../../../frontend/ErrorCode'
import TokenTypeImpl from '../../../../frontend/tokens/TokenTypeImpl'
import TokenInterface from '../../../../frontend/TokenInterface'

export class IfElseParser extends StatementParser
{
  parse(token: TokenInterface | null): CodeNodeInterface | null
  {
    const ifNode = CodeFactory.createCodeNode(token.getType() == TokenTypeImpl.IF ? CodeNodeTypeImpl.IF : CodeNodeTypeImpl.ELSEIF)

    this.nextToken()

    const exprParser = new ExpressionParser(this)

    token = this.nextToken()
    
    const condNode = exprParser.parse(token)
    ifNode.addChild(condNode) 

    token = this.nextToken()
    
    let statementParser = new StatementParser(this)
    statementParser.parseBody(token, ifNode)

    token = this.currentToken()
    let tokenType = token.getType()
    
    if (tokenType == TokenTypeImpl.ELSE) {
      token = this.nextToken()
      const elseNode = tokenType == TokenTypeImpl.ELSE ? CodeFactory.createCodeNode(CodeNodeTypeImpl.ELSE) : CodeFactory.createCodeNode(CodeNodeTypeImpl.ELSEIF)
      ifNode.addChild(elseNode)

      statementParser = new StatementParser(this)
      statementParser.parseBody(token, elseNode)

      this.nextToken() //???
    } else if (tokenType == TokenTypeImpl.ELSEIF) {
      let statementParser = new StatementParser(this)
      const elseIfNode = statementParser.parse(token)
      ifNode.addChild(elseIfNode)
    }
    
    return ifNode
  }
}