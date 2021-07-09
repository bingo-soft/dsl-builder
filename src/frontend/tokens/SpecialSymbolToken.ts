import Token from '../Token'
import TokenTypeImpl from './TokenTypeImpl'

export default class SpecialSymbolToken extends Token
{
  extract(): void
  {
    let currentChar = this.currentChar()
    let prevChar
    switch(currentChar) {
      case "+":
      case "-":
        prevChar = currentChar
        currentChar = this.nextChar()
        if (currentChar == prevChar) {
          if (currentChar == '+') {
            this.type = TokenTypeImpl.INCREMENT
          } else {
            this.type = TokenTypeImpl.DECREMENT
          }
          this.value = prevChar + currentChar       
          this.nextChar()       
        } else {
          this.value = prevChar
          if (prevChar == '+') {
            this.type = TokenTypeImpl.ADD
          } else {
            this.type = TokenTypeImpl.SUBTRACT
          }
        }
        break
      case "=":
        prevChar = currentChar
        currentChar = this.nextChar()
        if (currentChar == prevChar) {
          this.type = TokenTypeImpl.EQUALS
          this.value = prevChar + currentChar          
          this.nextChar()       
        } else {
          this.type = TokenTypeImpl.ASSIGN
          this.value = prevChar
        }
        break
      case "*":
      case "/":      
        this.type = (currentChar == '*') ? TokenTypeImpl.MULTIPLY : TokenTypeImpl.DIVIDE
        this.value = currentChar
        this.nextChar()
        break
      case "(":
      case ")":      
        this.type = (currentChar == ')') ? TokenTypeImpl.RIGHT_PAREN : TokenTypeImpl.LEFT_PAREN
        this.value = currentChar
        this.nextChar()
        break
      case ">":
      case "<":
        prevChar = currentChar
        currentChar = this.nextChar()
        if (currentChar == "=") {
          this.type = (prevChar == '>') ? TokenTypeImpl.GREATER_EQUALS : TokenTypeImpl.LESS_EQUALS
          this.value = prevChar + currentChar          
          this.nextChar()       
        } else {
          this.type = (prevChar == '>') ? TokenTypeImpl.GREATER_THAN : TokenTypeImpl.LESS_THAN
          this.value = prevChar
        }
        break
      default:
        break
    }
  }
}