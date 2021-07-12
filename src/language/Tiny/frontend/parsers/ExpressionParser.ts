import CodeNodeInterface from '../../../../intermediate/CodeNodeInterface'
import TokenInterface from '../../../../frontend/TokenInterface'
import { TinyParser } from '../TinyParser'

export class ExpressionParser extends TinyParser
{
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
    rootNode = this.parseLogicAnd(rootNode)
    rootNode = this.parseLogicOr(rootNode)
    return rootNode
  }

  protected parseTerm(token: TokenInterface): CodeNodeInterface | null
  {
    let rootNode = this.parseFactor(token)
    rootNode = this.parseMultiplication(rootNode)
    rootNode = this.parseRelation(rootNode)
    return rootNode
  }
}