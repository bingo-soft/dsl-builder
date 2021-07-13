import Token from '../../../../frontend/Token'
import TokenTypeImpl from '../../../../frontend/tokens/TokenTypeImpl'

export default class WordToken extends Token
{
  extract(): void
  {
    let currentChar = this.currentChar()
          
    let textBuffer = ''
    while ((/[a-zA-Z0-9_]+/i).test(currentChar)) {
      textBuffer += currentChar
      currentChar = this.nextChar()
    }
          
    if (textBuffer == 'let') {
      this.type = TokenTypeImpl.IDENTIFIER
      while ((/\s+/i).test(currentChar)) {
        currentChar = this.nextChar()
      }
      let name = ''
      while ((/[a-zA-Z0-9_]+/i).test(currentChar)) {
        name += currentChar
        currentChar = this.nextChar()
      }
      this.value = name
      this.text = name
    } else if (textBuffer == 'true' || textBuffer == 'false') {
      this.type = TokenTypeImpl.BOOLEAN
      this.text = textBuffer
      this.value = JSON.parse(textBuffer)
    } else if (textBuffer == 'return') {
      this.type = TokenTypeImpl.RETURN
      this.text = textBuffer
    }    
  }
}