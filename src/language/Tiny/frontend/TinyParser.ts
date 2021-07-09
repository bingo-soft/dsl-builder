import AbstractParser from '../../../frontend/AbstractParser'
import CodeFactory from '../../../intermediate/CodeFactory'
import CodeNodeInterface from '../../../intermediate/CodeNodeInterface'
import CodeNodeTypeImpl from '../../../intermediate/impl/CodeNodeTypeImpl'
import CodeKeyImpl from '../../../intermediate/impl/CodeKeyImpl'
import EofToken from '../../../frontend/EofToken'
import Message from '../../../message/Message'
import { MessageType } from '../../../message/MessageType'
import ExpressionParser from './parsers/ExpressionParser'
import TinyScanner from './TinyScanner'
import TokenInterface from '../../../frontend/TokenInterface'

export default class TinyParser extends AbstractParser
{
  parse(token?: TokenInterface | null): CodeNodeInterface | null
  {
    const startTime = Date.now()
      
    const rootNode = CodeFactory.createCodeNode(CodeNodeTypeImpl.SCRIPT)      
    this.iCode = CodeFactory.createCode()       
    this.iCode.setRoot(rootNode)
      
    while (!((token = this.nextToken()) instanceof EofToken)) {
      const expressionParser = new ExpressionParser(<TinyScanner> this.scanner)
      const node = expressionParser.parse(token)
      if (node != null) {
        rootNode.addChild(node)
      }            
      token = this.currentToken()      
    }    
    
    const elapsedTime = Date.now() - startTime
    this.sendMessage(new Message(MessageType.INTERPRETER_SUMMARY, [token.getLineNumber(), this.getErrorCount(), elapsedTime]))

    return null
  }

  getErrorCount(): number
  {
    return TinyParser.errorHandler.getErrorCount()
  }
  
  protected setLineNumber(node: CodeNodeInterface | null, token: TokenInterface): void
  {
    if (node != null) {
      node.setAttribute(CodeKeyImpl.LINE, token.getLineNumber())
    }
  }
}