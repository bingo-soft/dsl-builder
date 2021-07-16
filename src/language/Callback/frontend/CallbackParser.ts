import AbstractParser from '../../../frontend/AbstractParser'
import CodeFactory from '../../../intermediate/CodeFactory'
import CodeNodeInterface from '../../../intermediate/CodeNodeInterface'
import CodeNodeTypeImpl from '../../../intermediate/impl/CodeNodeTypeImpl'
import CodeKeyImpl from '../../../intermediate/impl/CodeKeyImpl'
import EofToken from '../../../frontend/EofToken'
import Message from '../../../message/Message'
import { MessageType } from '../../../message/MessageType'
import { StatementParser } from './parsers'
import CallbackScanner from './CallbackScanner'
import TokenInterface from '../../../frontend/TokenInterface'

export class CallbackParser extends AbstractParser
{
    parse(token?: TokenInterface | null): CodeNodeInterface | null
    {
      const startTime = Date.now()
        
      const rootNode = CodeFactory.createCodeNode(CodeNodeTypeImpl.SCRIPT)      
      this.iCode = CodeFactory.createCode()       
      this.iCode.setRoot(rootNode)
      
      token = this.nextToken()
      while (!(token instanceof EofToken)) {
        const statementParser = new StatementParser(<CallbackScanner> this.scanner)
        const node = statementParser.parse(token)
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
      return CallbackParser.errorHandler.getErrorCount()
    }
    
    protected setLineNumber(node: CodeNodeInterface | null, token: TokenInterface): void
    {
      if (node != null) {
        node.setAttribute(CodeKeyImpl.LINE, token.getLineNumber())
      }
    }
}