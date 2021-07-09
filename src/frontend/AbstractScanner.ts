import Source from './Source'
import TokenInterface from './TokenInterface'

export default abstract class AbstractScanner { 
  protected source: Source
  
  private currentToken_: TokenInterface

  constructor(source: Source)
  {
    this.source = source
  }

  currentToken(): TokenInterface
  {
    return this.currentToken_
  }

  nextToken(): TokenInterface
  {
    this.currentToken_ = this.extractToken()
    return this.currentToken_
  }

  protected abstract extractToken(): TokenInterface

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

  skipWhiteSpace(): void
  {
    let currentChar = this.currentChar()
      
    while ((/^[\s|\r\n|\n|\t]+/.test(currentChar)) || currentChar == '/') {
      // Start a comment
      if (currentChar == '/') {
        const nextChar = this.peekChar()
        // one-line comment
        if (nextChar == '/') {
          do {
            currentChar = this.nextChar();
          } while (currentChar != Source.EOL && currentChar != Source.EOF)
        } else if (nextChar == '*') { // multi-line comment
          do {
            currentChar = this.nextChar();
          } while (currentChar != '/' && currentChar != Source.EOF)
          this.nextChar(); // consume last "/"
          this.skipWhiteSpace(); // consume white space after comment
        } else {
          break // it may be division operation
        }
      } else {
        currentChar = this.nextChar()
      }
    }
  }
}