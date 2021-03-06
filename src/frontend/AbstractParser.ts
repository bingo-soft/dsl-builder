import CodeFactory from '../intermediate/CodeFactory'
import CodeInterface from '../intermediate/CodeInterface'
import CodeKeyImpl from '../intermediate/impl/CodeKeyImpl'
import CodeNodeInterface from '../intermediate/CodeNodeInterface'
import CodeNodeTypeImpl from '../intermediate/impl/CodeNodeTypeImpl'
import EofToken from './EofToken'
import ErrorCode from './ErrorCode'
import ErrorHandler from './ErrorHandler'
import ListenableTrait from '../message/ListenableTrait'
import MessageProducerInterface from '../message/MessageProducerInterface'
import AbstractScanner from './AbstractScanner'
import SymTabFactory from '../intermediate/impl/SymTabFactory'
import SymTabStackInterface from '../intermediate/SymTabStackInterface'
import TokenInterface from './TokenInterface'
import TokenTypeImpl from './tokens/TokenTypeImpl'

export default abstract class AbstractParser extends ListenableTrait implements MessageProducerInterface 
{
  protected retainSemicolon = false

  protected static errorHandler = new ErrorHandler()

  protected static symTabStack: SymTabStackInterface = SymTabFactory.createSymTabStack()

  protected scanner: AbstractScanner

  protected iCode: CodeInterface

  private parentheses = 0

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

  getSymTabStack(): SymTabStackInterface
  {
    return AbstractParser.symTabStack
  }

  protected parseAddition(rootNode: CodeNodeInterface): CodeNodeInterface | null
  {
    let token = this.currentToken()
    let tokenType = token.getType()
    let nodeType
    while (TokenTypeImpl.ADD_OPS.includes(<string> tokenType) || tokenType == TokenTypeImpl.OR) {
      if (tokenType == TokenTypeImpl.ADD) {
        nodeType = CodeNodeTypeImpl.ADD
      } else if (tokenType == TokenTypeImpl.SUBTRACT) {
        nodeType = CodeNodeTypeImpl.SUBTRACT
      } else if (tokenType == TokenTypeImpl.OR) {
        nodeType = CodeNodeTypeImpl.OR
      }
      const opNode = CodeFactory.createCodeNode(nodeType)
      opNode.addChild(rootNode)
      token = this.nextToken()
      opNode.addChild(this.parseTerm(token))
      rootNode = opNode
      token = this.currentToken()
      tokenType = token.getType()
    }
    return rootNode
  }


  protected parseMultiplication(rootNode: CodeNodeInterface): CodeNodeInterface | null
  {
    let token = this.currentToken()
    let tokenType = token.getType()
    let nodeType
    while (TokenTypeImpl.MULT_OPS.includes(<string> tokenType) || tokenType == TokenTypeImpl.AND) {
      if (tokenType == TokenTypeImpl.MULTIPLY) {
        nodeType = CodeNodeTypeImpl.MULTIPLY
      } else if (tokenType == TokenTypeImpl.DIVIDE) {
        nodeType = CodeNodeTypeImpl.DIVIDE
      } else if (tokenType == TokenTypeImpl.AND) {
        nodeType = CodeNodeTypeImpl.AND
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
    let name
    let id
    switch (tokenType) {
      case TokenTypeImpl.IDENTIFIER:
        name = token.getText()
        id = AbstractParser.symTabStack.lookup(name)
        if (id == null) {
          id = AbstractParser.symTabStack.enterLocal(name)
        }
        rootNode = CodeFactory.createCodeNode(CodeNodeTypeImpl.VARIABLE)
        rootNode.setAttribute(CodeKeyImpl.ID, id)
        id.appendLineNumber(token.getLineNumber())
        this.nextToken()
        return rootNode
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
      case TokenTypeImpl.CONTEXT:
        rootNode = CodeFactory.createCodeNode(CodeNodeTypeImpl.CONTEXT)
        rootNode.setAttribute(CodeKeyImpl.VALUE, token.getValue())
        this.nextToken()
        return rootNode
      case TokenTypeImpl.ARRAY:
        rootNode = CodeFactory.createCodeNode(CodeNodeTypeImpl.ARRAY)
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
      case TokenTypeImpl.RETURN:
        rootNode = CodeFactory.createCodeNode(CodeNodeTypeImpl.RETURN)
        token = this.nextToken()
        rootNode.addChild(this.parseExpression(token))
        /* this.nextToken() */ // inside if block it is nt needed, otherwise } consumed
        return rootNode
      case TokenTypeImpl.FUNCTION:
        rootNode = CodeFactory.createCodeNode(CodeNodeTypeImpl.FUNCTION)
        rootNode.setAttribute(CodeKeyImpl.VALUE, token.getValue())
        return rootNode
      default:
        AbstractParser.errorHandler.flag(token, ErrorCode.UNEXPECTED_TOKEN, this)
        break
    }
  }

  protected parseRelation(rootNode: CodeNodeInterface | null): CodeNodeInterface | null
  {
    let token = this.currentToken()
    let tokenType = token.getType()
    let nodeType
    while (TokenTypeImpl.REL_OPS.includes(<string> tokenType)) {
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

  protected parseFunction(rootNode: CodeNodeInterface | null): CodeNodeInterface | null
  {
    let token = this.currentToken()
    let tokenType = token.getType()
    let node
    if (tokenType == TokenTypeImpl.FUNCTION) {
      token = this.nextToken()
      tokenType = token.getType()
      if (tokenType == TokenTypeImpl.LEFT_PAREN) {
        this.parentheses = 1
        while (!((token = this.nextToken()) instanceof EofToken)) {
          tokenType = token.getType()
          if (tokenType == TokenTypeImpl.COMMA) {
            continue          
          }
          node = this.parseExpression(token)
          //node.setAttribute(CodeKeyImpl.FUNCTION, rootNode.getAttribute(CodeKeyImpl.VALUE))
          if (node != null) {
            rootNode.addChild(node)
          } 
          token = this.currentToken()
          tokenType = token.getType()
          if (tokenType == TokenTypeImpl.LEFT_PAREN) {
            this.parentheses += 1
            continue
          }
          if (tokenType == TokenTypeImpl.RIGHT_PAREN) {
            this.parentheses -= 1
            if (this.parentheses == 0) {
              break
            }
            continue
          }                   
        }
        this.nextToken() //??? consume paranthesis
      }
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