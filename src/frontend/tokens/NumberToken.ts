import Token from '../Token'
import TokenTypeImpl from './TokenTypeImpl'

export default class NumberToken extends Token
{
  extract(): void
  {
    let currentChar = this.currentChar()
        
    let textBuffer = ''
    // digits before decimal point
    while (!isNaN(parseInt(currentChar, 10))) {
      textBuffer += currentChar
      currentChar = this.nextChar()
    }
        
    //digits after decimal point
    if (currentChar == '.') {
      textBuffer += '.'
      currentChar = this.nextChar()
      while (!isNaN(parseInt(currentChar, 10))) {
        textBuffer += currentChar
        currentChar = this.nextChar()
      }
      this.type = TokenTypeImpl.FLOAT
      this.value = parseFloat(textBuffer)
    } else {
      this.type = TokenTypeImpl.INTEGER
      this.value = parseInt(textBuffer, 10)
    }
      this.text = textBuffer
  }

}