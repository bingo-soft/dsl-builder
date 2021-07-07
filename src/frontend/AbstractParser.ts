import CodeInterface from '../intermediate/CodeInterface'
import CodeNodeInterface from '../intermediate/CodeNodeInterface'
import ListenableTrait from '../message/ListenableTrait'
import MessageProducerInterface from '../message/MessageProducerInterface'
import AbstractScanner from './AbstractScanner'
import SymTabInterface from '../intermediate/SymTabInterface'
import Token from './Token'

export default abstract class AbstractParser extends ListenableTrait implements MessageProducerInterface 
{
  protected symTab: SymTabInterface

  protected scanner: AbstractScanner

  protected iCode: CodeInterface

  constructor(scanner: AbstractScanner)
  {
    super()
    this.scanner = scanner
  }

  abstract parse(token: Token | null): CodeNodeInterface | null

  abstract getErrorCount(): number

  currentToken(): Token
  {
    return this.scanner.currentToken()
  }

  nextToken(): Token
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
  
}