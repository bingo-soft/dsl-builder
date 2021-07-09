import CodeNodeTypeInterface from '../CodeNodeTypeInterface'

export default class CodeNodeTypeImpl implements CodeNodeTypeInterface
{
  public static SCRIPT = "script"

  public static SUM = "sum"
  public static COUNT = "count"
  public static MIN = "min"
  public static MAX = "max"

  public static AND = "and"
  public static OR = "or"
  public static IF = "if"
  public static THEN = "then"
  public static ELSE = "else"
  public static NOT = "not"
  public static TRUE = "true"
  public static FALSE = "false"

  public static LOGIC_OPS = [CodeNodeTypeImpl.AND, CodeNodeTypeImpl.OR]
  public static BOOLEAN_OPS = [CodeNodeTypeImpl.TRUE, CodeNodeTypeImpl.FALSE]

  // ==, !=, ...
  public static EQ = "eq"
  public static NE = "ne"
  public static LT = "lt"
  public static LE = "le"
  public static GT = "gt"
  public static GE = "ge"

  public static RELATION_OPS = [CodeNodeTypeImpl.EQ, CodeNodeTypeImpl.NE, CodeNodeTypeImpl.LT, CodeNodeTypeImpl.LE, CodeNodeTypeImpl.GT, CodeNodeTypeImpl.GE]

  // +, -, !, *, /
  public static ADD = "add"
  public static SUBTRACT = "subtract"
  public static NEGATE = "negate"
  public static MULTIPLY = "multiply"
  public static DIVIDE = "divide"

  public static ARITHMETIC_OPS = [CodeNodeTypeImpl.ADD, CodeNodeTypeImpl.SUBTRACT, CodeNodeTypeImpl.MULTIPLY, CodeNodeTypeImpl.DIVIDE]

  public static NUMBER = "number"
  public static FLOAT = "float"
  public static INTEGER = "integer"
  public static STRING = "string"
  public static BOOLEAN = "boolean"

  public static isLogic(nodeType: CodeNodeTypeImpl | null): boolean
  {
    return CodeNodeTypeImpl.LOGIC_OPS.includes(<string> nodeType)
  }

  public static isBoolean(nodeType: CodeNodeTypeImpl | null): boolean
  {
    return CodeNodeTypeImpl.BOOLEAN_OPS.includes(<string> nodeType)
  }

  public static isRelation(nodeType: CodeNodeTypeImpl | null): boolean
  {
    return CodeNodeTypeImpl.RELATION_OPS.includes(<string> nodeType)
  }

  public static isArithmetic(nodeType: CodeNodeTypeImpl | null): boolean
  {
    return CodeNodeTypeImpl.ARITHMETIC_OPS.includes(<string> nodeType)
  }
       
}