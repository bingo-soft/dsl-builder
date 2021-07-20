import Token from '../../../../frontend/Token'
import TokenTypeImpl from '../../../../frontend/tokens/TokenTypeImpl'

export default class ArrayToken extends Token
{
  extract(): void
  {
    let currentChar = this.nextChar()
    let textBuffer = ''
    while (currentChar != ']') {
      textBuffer += currentChar
      currentChar = this.nextChar()
    }
    this.type = TokenTypeImpl.ARRAY
    this.text = textBuffer
    this.value = textBuffer.split(",").map((val: any) => {
      if (!isNaN(val)) {
        return parseInt(val)
      }
      return val
    })
    this.nextChar()
  }
}