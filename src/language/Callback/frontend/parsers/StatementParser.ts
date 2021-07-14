import { CallbackParser, AssignmentParser, ExpressionParser }  from '../parsers'
import CodeNodeInterface from '../../../../intermediate/CodeNodeInterface'
import ErrorCode from '../../../../frontend/ErrorCode'
import TokenInterface from '../../../../frontend/TokenInterface'
import TokenTypeImpl from '../../../../frontend/tokens/TokenTypeImpl'

export class StatementParser extends CallbackParser
{
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
        return parser.parse(token)
      case TokenTypeImpl.SEMICOLON:
        return null
      default:
        StatementParser.errorHandler.flag(token, ErrorCode.UNEXPECTED_TOKEN, this)
        return null
    }
  }
}