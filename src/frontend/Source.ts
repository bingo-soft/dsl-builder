import ListenableTrait from '../message/ListenableTrait'
import Message from '../message/Message'
import MessageProducerInterface from '../message/MessageProducerInterface'
import { MessageType } from '../message/MessageType'


export default class Source extends ListenableTrait implements MessageProducerInterface 
{
  public static EOF = '\0'

  public static EOL = '\n'

  private source: string

  private lines: string[] = []

  private line: string

  private lineNum = 0

  private currentPos = -2

  private context

  constructor(source: string, context?: any)
  {
    super()
    this.source = source
    this.context = context
  }

  currentChar(): string
  {
    // Read for the first time
    if (this.currentPos == -2) {
      this.readLines()
      this.readLine()
      return this.nextChar()
    }

    // At end of source code
    if (this.lineNum > this.lines.length) {
        return Source.EOF
    }
    
    // At end of line?
    if (this.currentPos == -1 || this.currentPos == this.line.length) {
        return Source.EOL
    }

    // Need to read next line
    if (this.currentPos > this.line.length) {
        if (this.lineNum == this.lines.length) {
            return Source.EOF
        }
        this.readLine()
        return this.nextChar()
    }
    
    return this.line[this.currentPos]

  }

  nextChar(): string
  {
    this.currentPos += 1
    return this.currentChar()
  }

  peekChar(): string
  {
    this.currentChar()
      
    if (this.lines.length > this.lineNum) {
      return Source.EOF
    }
      
    const nextPos = this.currentPos + 1
      
    return nextPos < this.line.length ? this.line[nextPos] : Source.EOL
  }

  peekRange(len: number): string
  {
    this.currentChar()

    if (this.lineNum > this.lines.length) {
      return Source.EOF;
    }

    const startPos = this.currentPos + 1
    const endPos = startPos + len - 1
    
    return startPos < this.line.length &&
           endPos < this.line.length ? this.line.substring(startPos, len) : Source.EOL
  }

  readLines(): void
  {
    if (this.source != null) {
      this.lines = this.source.trim().split(/\r?\n/g)
    }
  }

  readLine(): void
  {
    this.line = this.lines[this.lineNum]
    this.currentPos = -1
    this.lineNum += 1

    // Send a source line message to all listeners
    if (this.line) {
      this.sendMessage(new Message(MessageType.SOURCE_LINE, [this.lineNum, this.line]))
    }
  }

  getLineNumber(): number
  {
    return this.lineNum
  }

  getPosition(): number
  {
    return this.currentPos
  }

  getContextValue(key: string, value?: any): any
  {
    const data = value ?? this.context
    let topKey = key
    let nested = false
    if (key.indexOf(".") != -1) {
      nested = true
      topKey = key.split(".")[0]
    }
    if (data != null && Object.prototype.hasOwnProperty.call(data, topKey)) {
      if (nested) {
        const newKey = key.split(".").slice(1).join(".")
        return this.getContextValue(newKey, data[topKey])
      } else {
        return data[key]
      }
    } else {
      return null
    }
  }
}