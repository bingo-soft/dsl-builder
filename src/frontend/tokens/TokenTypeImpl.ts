import TokenTypeInterface from '../TokenTypeInterface'

export default class TokenTypeImpl implements TokenTypeInterface
{
  public static ERROR = "error"
  public static NUMBER = "number"
  public static FLOAT = "float"
  public static INTEGER = "integer"
  public static STRING = "string"
  public static BOOLEAN = "boolean"
  public static RETURN = "return"

  public static AND = "and"
  public static OR = "or"

  public static ASSIGN = "="
  public static EQUALS = "=="
  public static NOT_EQUALS = "!="
  public static GREATER_THAN = ">"
  public static GREATER_EQUALS = ">="
  public static LESS_THAN = "<"
  public static LESS_EQUALS = "<="

  public static MULTIPLY = '*'
  public static DIVIDE = '/'

  public static ADD = "+"
  public static SUBTRACT = "-"
  public static INCREMENT = "++"
  public static DECREMENT = "--"

  public static IDENTIFIER = "identifier"

  public static LEFT_PAREN = "("
  public static RIGHT_PAREN = ")"
  public static COMMA = ","
  public static SEMICOLON = ";"

  public static ADD_OPS = ["+", "-", "++", "--"]
  public static MULT_OPS = ["*", "/"]
  public static REL_OPS = ['==', '!=', '>', '>=', '<', '<=']

  public static SPECIAL_SYMBOLS = ['+', '-', '=', '*', '/', '(', ')', '>', '<', ',', ';']
}