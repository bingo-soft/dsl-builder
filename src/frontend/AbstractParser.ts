import CodeFactory from '../intermediate/CodeFactory'
import CodeInterface from '../intermediate/CodeInterface'
import CodeKeyImpl from '../intermediate/impl/CodeKeyImpl'
import CodeNodeInterface from '../intermediate/CodeNodeInterface'
import CodeNodeTypeImpl from '../intermediate/impl/CodeNodeTypeImpl'
import ErrorCode from './ErrorCode'
import ErrorHandler from './ErrorHandler'
import ListenableTrait from '../message/ListenableTrait'
import MessageProducerInterface from '../message/MessageProducerInterface'
import AbstractScanner from './AbstractScanner'
import SymTabInterface from '../intermediate/SymTabInterface'
import TokenInterface from './TokenInterface'
import TokenTypeImpl from './tokens/TokenTypeImpl'

export default abstract class AbstractParser extends ListenableTrait implements MessageProducerInterface 
{
  protected static errorHandler = new ErrorHandler()

  protected symTab: SymTabInterface

  protected scanner: AbstractScanner

  protected iCode: CodeInterface

  constructor(scanner: AbstractScanner)
  {
    super()
    this.scanner = scanner
  }

  abstract parse(token?: TokenInterface | null): CodeNodeInterface | null

  abstract getErrorCount(): number

  currentToken(): TokenInterface
  {
    return this.scanner.currentToken()
  }

  nextToken(): TokenInterface
  {
    return this.scanner.nextToken()
  }

  getICode(): CodeInterface
  {
    return this.iCode
  }

  getSymTab(): SymTabInterface
  {
    return this.symTab
  }

  protected parseAddition(rootNode: CodeNodeInterface): CodeNodeInterface | null
  {
    let token = this.currentToken()
    const tokenValue = token.getValue()
    let tokenType = token.getType()
    let nodeType
    while (TokenTypeImpl.ADD_OPS.includes(tokenValue)) {
      if (tokenType == TokenTypeImpl.ADD) {
        nodeType = CodeNodeTypeImpl.ADD
      } else if (tokenType == TokenTypeImpl.SUBTRACT) {
        nodeType = CodeNodeTypeImpl.SUBTRACT
      }
      const opNode = CodeFactory.createCodeNode(nodeType)
      opNode.addChild(rootNode)
      token = this.nextToken()
      opNode.addChild(this.parseTerm(token))
      rootNode = opNode
      token = this.currentToken()
      tokenType = token.getType()
    }
    return rootNode;
  }


  protected parseMultiplication(rootNode: CodeNodeInterface): CodeNodeInterface | null
  {
    let token = this.currentToken()
    const tokenValue = token.getValue()
    let tokenType = token.getType()
    let nodeType
    while (TokenTypeImpl.MULT_OPS.includes(tokenValue)) {
      if (tokenType == TokenTypeImpl.MULTIPLY) {
        nodeType = CodeNodeTypeImpl.MULTIPLY
      } else if (tokenType == TokenTypeImpl.DIVIDE) {
        nodeType = CodeNodeTypeImpl.DIVIDE
      }
      const opNode = CodeFactory.createCodeNode(nodeType)
      opNode.addChild(rootNode)
      token = this.nextToken()
      opNode.addChild(this.parseFactor(token))
      rootNode = opNode
      token = this.currentToken()
      tokenType = token.getType()
    }
    return rootNode
  }

  protected parseFactor(token: TokenInterface): CodeNodeInterface | null
  {
    let rootNode
    const tokenType = token.getType()
    switch (tokenType) {
      case TokenTypeImpl.FLOAT:
        rootNode = CodeFactory.createCodeNode(CodeNodeTypeImpl.FLOAT)
        rootNode.setAttribute(CodeKeyImpl.VALUE, token.getValue())
        this.nextToken()
        return rootNode
      case TokenTypeImpl.INTEGER:
        rootNode = CodeFactory.createCodeNode(CodeNodeTypeImpl.INTEGER)
        rootNode.setAttribute(CodeKeyImpl.VALUE, token.getValue())
        this.nextToken()
        return rootNode
      case TokenTypeImpl.STRING:
        rootNode = CodeFactory.createCodeNode(CodeNodeTypeImpl.STRING)
        rootNode.setAttribute(CodeKeyImpl.VALUE, token.getValue())
        this.nextToken()
        return rootNode
      case TokenTypeImpl.BOOLEAN:
        rootNode = CodeFactory.createCodeNode(CodeNodeTypeImpl.BOOLEAN)
        rootNode.setAttribute(CodeKeyImpl.VALUE, token.getValue())
        this.nextToken()
        return rootNode
      case TokenTypeImpl.LEFT_PAREN:
        token = this.nextToken()
        rootNode = this.parseExpression(token)
        token = this.currentToken()
        if (token.getType() == TokenTypeImpl.RIGHT_PAREN) {
          token = this.nextToken()
        }
        return rootNode
      default:
        AbstractParser.errorHandler.flag(token, ErrorCode.UNEXPECTED_TOKEN, this)
        break
    }
  }

  protected parseRelation(rootNode: CodeNodeInterface | null): CodeNodeInterface | null
  {
    let token = this.currentToken()
    const tokenValue = token.getValue()
    let tokenType = token.getType()
    let nodeType
    while (TokenTypeImpl.REL_OPS.includes(tokenValue)) {
      if (tokenType == TokenTypeImpl.EQUALS) {
        nodeType = CodeNodeTypeImpl.EQ
      } else if (tokenType == TokenTypeImpl.NOT_EQUALS) {
        nodeType = CodeNodeTypeImpl.NE
      } else if (tokenType == TokenTypeImpl.LESS_THAN) {
        nodeType = CodeNodeTypeImpl.LT
      } else if (tokenType == TokenTypeImpl.LESS_EQUALS) {
        nodeType = CodeNodeTypeImpl.LE
      } else if (tokenType == TokenTypeImpl.GREATER_THAN) {
        nodeType = CodeNodeTypeImpl.GT
      } else if (tokenType == TokenTypeImpl.GREATER_EQUALS) {
        nodeType = CodeNodeTypeImpl.GE
      }
      const opNode = CodeFactory.createCodeNode(nodeType)
      opNode.setAttribute(CodeKeyImpl.VALUE, token.getValue())
      opNode.addChild(rootNode)
      token = this.nextToken()
      opNode.addChild(this.parseTerm(token))
      rootNode = opNode
      token = this.currentToken()
      tokenType = token.getType()
    }

    return rootNode
  }

  protected parseLogicAnd(rootNode: CodeNodeInterface | null): CodeNodeInterface | null
  {
    let token = this.currentToken()
    let tokenType = token.getType()
    let nodeType
    while (tokenType == TokenTypeImpl.AND) {
      nodeType = CodeNodeTypeImpl.AND
      const opNode = CodeFactory.createCodeNode(nodeType)
      opNode.setAttribute(CodeKeyImpl.VALUE, token.getValue())
      opNode.addChild(rootNode)
      token = this.nextToken()
      opNode.addChild(this.parseTerm(token))
      rootNode = opNode
      token = this.currentToken()
      tokenType = token.getType()
    }
    return rootNode
  }

  protected parseLogicOr(rootNode: CodeNodeInterface | null): CodeNodeInterface | null
  {
    let token = this.currentToken()
    let tokenType = token.getType()
    let nodeType
    while (tokenType == TokenTypeImpl.OR) {
      nodeType = CodeNodeTypeImpl.OR
      const opNode = CodeFactory.createCodeNode(nodeType)
      opNode.setAttribute(CodeKeyImpl.VALUE, token.getValue())
      opNode.addChild(rootNode)
      token = this.nextToken()
      let child = this.parseTerm(token)
      child = this.parseLogicAnd(child)
      opNode.addChild(child)
      rootNode = opNode
      token = this.currentToken()
      tokenType = token.getType()
    }
    return rootNode
  }


  protected parseExpression(token: TokenInterface | null): CodeNodeInterface | null
  {
    return null
  }

  protected parseTerm(token: TokenInterface): CodeNodeInterface | null
  {
    return null
  }
  
}