import Token from '../../../../frontend/Token'
import TokenTypeImpl from '../../../../frontend/tokens/TokenTypeImpl'

export default class WordToken extends Token
{
  extract(): void
  {
    let currentChar = this.currentChar()
          
    let textBuffer = ''
    while ((/[a-zA-Z0-9\._]+/i).test(currentChar)) {
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
    } else if (textBuffer.indexOf("context.") != -1) {
      this.type = TokenTypeImpl.CONTEXT
      const key = textBuffer.replace("context.", "")
      this.text = this.getContextValue(key)
      this.value = this.text
    } else if (textBuffer == 'return') {
      this.type = TokenTypeImpl.RETURN
      this.text = textBuffer
    } else if (textBuffer == 'includes') {
      this.type = TokenTypeImpl.FUNCTION
      this.text = textBuffer
      this.value = textBuffer
    } else if (textBuffer == 'json') {
      this.type = TokenTypeImpl.FUNCTION
      this.text = textBuffer
      this.value = textBuffer
    } else if (textBuffer == 'if') { 
      this.type = TokenTypeImpl.IF
      this.text = textBuffer
      this.value = textBuffer  
    } else if (textBuffer == 'else') { 
      this.type = TokenTypeImpl.ELSE
      this.text = textBuffer
      this.value = textBuffer  
    } else if (textBuffer == 'elseif') { 
      this.type = TokenTypeImpl.ELSEIF
      this.text = textBuffer
      this.value = textBuffer  
    } else {
      this.type = TokenTypeImpl.IDENTIFIER  
      this.text = textBuffer
      this.value = textBuffer
    }
  }
}