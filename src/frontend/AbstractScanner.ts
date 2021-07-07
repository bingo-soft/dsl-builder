import Source from './Source'
import Token from './Token'

export default abstract class AbstractScanner { 
  protected source: Source
  
  private currentToken_: Token

  constructor(source: Source)
  {
    this.source = source
  }

  currentToken(): Token
  {
    return this.currentToken_
  }

  nextToken(): Token
  {
    this.currentToken_ = this.extractToken()
    return this.currentToken_
  }

  protected abstract extractToken(): Token

  currentChar(): string
  {
    return this.source.currentChar()
  }

  nextChar(): string
  {
    return this.source.nextChar()
  }

  peekChar(): string
  {
    return this.source.peekChar()
  }

  peekRange(len: number): string
  {
    return this.source.peekRange(len)
  }

}