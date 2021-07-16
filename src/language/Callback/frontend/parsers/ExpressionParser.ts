import CodeNodeInterface from '../../../../intermediate/CodeNodeInterface'
import TokenInterface from '../../../../frontend/TokenInterface'
import { CallbackParser } from '../CallbackParser'

export class ExpressionParser extends CallbackParser
{
  protected retainSemicolon = false

  parse(token: TokenInterface | null): CodeNodeInterface | null
  {
    const expression = this.parseExpression(token)
    return expression
  }

  protected parseExpression(token: TokenInterface | null): CodeNodeInterface | null
  {
    const rootNode = this.parseSimpleExpression(token)
    return rootNode
  }

  private parseSimpleExpression(token: TokenInterface): CodeNodeInterface | null
  {
    let rootNode = this.parseTerm(token)
    rootNode = this.parseAddition(rootNode)
    return rootNode
  }

  protected parseTerm(token: TokenInterface): CodeNodeInterface | null
  {
    let rootNode = this.parseFactor(token)
    rootNode = this.parseFunction(rootNode)
    rootNode = this.parseMultiplication(rootNode)
    rootNode = this.parseRelation(rootNode)
    return rootNode
  }
}