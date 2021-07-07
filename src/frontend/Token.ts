import TokenTypeInterface from './TokenTypeInterface'
import Source from './Source'

export default class Token {
  protected type: TokenTypeInterface

  protected text: string

  protected value: unknown

  protected source: Source

  protected lineNum: number

  protected position: number

  constructor(source: Source) 
  {
    this.source = source
    this.lineNum = source.getLineNumber()
    this.position = source.getPosition()
    this.extract()
  }

  extract(): void
  {
    this.text = this.source.currentChar()
    this.value = null
    this.nextChar()
  }

  currentChar(): string
  {
    return this.source.currentChar()
  }

  nextChar(): string
  {
    return this.source.nextChar()
  }

  consumeChars(num: number): void
  {
    if (num > 0) {
      while (num--) {
        this.nextChar()
      }
    }
  }

  peekChar(): string
  {
    return this.source.peekChar()
  }

  peekRange(len: number): string
  {
    return this.source.peekRange(len)
  }

  getLineNumber(): number
  {
    return this.source.getLineNumber()
  }

  getType(): TokenTypeInterface | null
  {
    return this.type
  }

  setType(type: TokenTypeInterface): void
  {
    this.type = type
  }

  getPosition(): number
  {
    return this.source.getPosition()
  }

  getText(): string
  {
    return this.text
  }

  getValue(): unknown
  {
    return this.value
  }

}