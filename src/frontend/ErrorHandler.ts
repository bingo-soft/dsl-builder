import AbstractParser from './AbstractParser'
import ErrorCode from './ErrorCode'
import Message from '../message/Message'
import { MessageType } from '../message/MessageType'
import TokenInterface from './TokenInterface'

export default class ErrorHandler
{
  public static MAX_ERRORS = 25
  private static errorCount = 0

  flag(token: TokenInterface, errorCode: unknown, parser: AbstractParser): void
  {
    parser.sendMessage(new Message(MessageType.SYNTAX_ERROR, [token.getLineNumber(),
                                                                   token.getPosition(),
                                                                   token.getText(),
                                                                   errorCode]));
    ErrorHandler.errorCount += 1
    if (ErrorHandler.errorCount > ErrorHandler.MAX_ERRORS) {
      this.abortTranslation(ErrorCode.TOO_MANY_ERRORS, parser)
    }
  }

  abortTranslation(errorCode: unknown, parser: AbstractParser): void
  {
    const fatalText = `FATAL ERROR: ${errorCode}`
    parser.sendMessage(new Message(MessageType.SYNTAX_ERROR, [0, 0, "", fatalText]))
    //throw new Error(fatalText)
  }
  
  
  getErrorCount(): number
  {
    return ErrorHandler.errorCount
  }
}