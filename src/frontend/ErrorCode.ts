export default class ErrorCode
{
  public static UNEXPECTED_EOF = "Unexpected end of data"
  public static UNEXPECTED_TOKEN = "Unexpected token"
  public static TOO_MANY_ERRORS = "Too may errors"
  public static MISSING_EQUALS_SIGN = "Equals sign is missing"
    
  private status: number
  private message: string

  constructor(status = 0, message: string)
  {
    this.status = status
    this.message = message
  }

  getStatus(): number
  {
    return this.status
  }

  getMessage(): string
  {
    return this.message
  }
}