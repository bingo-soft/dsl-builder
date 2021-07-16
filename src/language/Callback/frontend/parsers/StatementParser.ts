import { CallbackParser, AssignmentParser, ExpressionParser, IfElseParser }  from '../parsers'
import CodeNodeInterface from '../../../../intermediate/CodeNodeInterface'
import EofToken from '../../../../frontend/EofToken'
import ErrorCode from '../../../../frontend/ErrorCode'
import TokenInterface from '../../../../frontend/TokenInterface'
import TokenTypeImpl from '../../../../frontend/tokens/TokenTypeImpl'

export class StatementParser extends CallbackParser
{
  private blockParentheses = 0

  parse(token: TokenInterface | null): CodeNodeInterface | null
  {
    const tokenType = token.getType()
    let parser
    switch(tokenType)
    {
      case TokenTypeImpl.IDENTIFIER:
        parser = new AssignmentParser(this.scanner)
        return parser.parse(token)
      case TokenTypeImpl.RETURN:
        parser = new ExpressionParser(this.scanner)
        const node = parser.parse(token)
        return node
      case TokenTypeImpl.IF:
      case TokenTypeImpl.ELSEIF:
        parser = new IfElseParser(this.scanner)
        return parser.parse(token)
      default:
        StatementParser.errorHandler.flag(token, ErrorCode.UNEXPECTED_TOKEN, this)
        return null
    }
  }

  parseBody(token: TokenInterface, parentNode: CodeNodeInterface): void
  {
    this.blockParentheses += 1
    let tokenType
    let node
    let parser
    token = this.nextToken()
    while (!(token instanceof EofToken)) {
      tokenType = token.getType()
      parser = new StatementParser(this)
      node = parser.parse(token)
      token = this.currentToken()
      if (tokenType == TokenTypeImpl.CURLY_LEFT_PAREN) {
        this.blockParentheses += 1        
        continue
      }
      if (tokenType == TokenTypeImpl.CURLY_RIGHT_PAREN) {
        this.blockParentheses -= 1
        if (this.blockParentheses == 0) {
          this.nextToken()  
          break
        }
        continue
      }
      if (node != null) {
        parentNode.addChild(node)
      }
    }
  }
}