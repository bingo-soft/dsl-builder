import ErrorCode from '../ErrorCode'
import Source from '../Source'
import Token from '../Token'
import TokenTypeImpl from './TokenTypeImpl'

export default class StringToken extends Token
{
  extract(): void
  {
    this.type = TokenTypeImpl.STRING
        
    let textBuffer = ''
    let valueBuffer = ''
        
    // consume initial quote
    let currentChar = this.nextChar()
        
    textBuffer += "'"
        
    // assume no nested quotes like 'Hello' world'
    do {
      // replace any whitespace with a blank
      if (/^[\s|\r\n|\n|\t]+/.test(currentChar)) {
        currentChar = ' '
      }
            
      textBuffer += currentChar
      valueBuffer += currentChar
      currentChar = this.nextChar()
    } while ((currentChar != "'") && currentChar != Source.EOF)
        
    if (currentChar == "'") {
      this.nextChar()
      textBuffer += "'"
      this.value = valueBuffer
    } else {
      this.type = TokenTypeImpl.ERROR
      this.value = ErrorCode.UNEXPECTED_EOF
    }
        
    this.text = textBuffer

  }

}