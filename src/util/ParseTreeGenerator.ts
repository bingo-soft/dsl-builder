import CodeInterface from '../intermediate/CodeInterface'
import CodeNodeImpl from '../intermediate/Impl/CodeNodeImpl'
import SymTabEntryInterface from '../intermediate/SymTabEntryInterface'

export default class ParseTreeGenerator
{
  private INDENT_WIDTH = 4

  private LINE_WIDTH = 120

  private isBeautified = true

  private length = 0

  private indent = ""

  private indentation = ""

  private line = ""

  private lines: string[] = []

  constructor(isBeautified = false)
  {
    this.isBeautified = isBeautified
    if (!this.isBeautified) {
      this.INDENT_WIDTH = 0
      this.LINE_WIDTH = Infinity
    }
    for (let i = 0; i < this.INDENT_WIDTH; i += 1) {
      this.indent += ' '
    }
  }

  ast(iCode: CodeInterface): string
  {
    this.addNode(<CodeNodeImpl> iCode.getRoot())
    this.addLine()
    return this.lines.join("")
  }

  addNode(node: CodeNodeImpl): void
  {
    this.addText(this.indentation);
    this.addText("<" + node.getText());

    this.addAttributes(node);
      
    const childNodes = node.getChildren();

    if (childNodes.length) {
      this.addText(">")
      this.addLine()
      this.addChildNodes(<CodeNodeImpl[]> childNodes)
      this.addText(this.indentation)
      this.addText("</" + node.getText() + ">")
    } else {
      this.addText(" ")
      this.addText("/>")
    }

    this.addLine();
  }

  addAttributes(node: CodeNodeImpl): void
  {
    const saveIndentation = this.indentation
    this.indentation += this.indent

    const attributes = node.getAttributes()
    for (const key in attributes) {
      this.addAttribute(key, attributes[key])
    }

    this.indentation = saveIndentation
  }

  addAttribute(keyString: string, value: unknown): void
  {
    const isSymTabEntry = (<SymTabEntryInterface> value).type  == 'SymTabEntry'
    const valueString = isSymTabEntry ? (<SymTabEntryInterface> value).getName() : value

    const text = keyString.toLowerCase() + '="' +  valueString + '"'
    this.addText(" ");
    this.addText(text);

    if (isSymTabEntry) {
      const level = (<SymTabEntryInterface> value).getSymTab().getNestingLevel()
      this.addAttribute("LEVEL", level)
    }
  }

  addChildNodes(childNodes: CodeNodeImpl[]): void
  {
    const saveIndentation =  this.indentation
    this.indentation +=  this.indent

    childNodes.forEach(child => {
       this.addNode(child)
    })

    this.indentation =  saveIndentation
  }

  addText(text: string): void
  {
    const textLength = text.length
    let lineBreak = false

    if (this.length + textLength > this.LINE_WIDTH) {
      this.addLine()
      this.line += this.indentation
      this.length = this.indentation.length
      lineBreak = true
    }

    if (!(lineBreak && text == ' ')) {
      this.line += text
      this.length += textLength
    }
  }

  addLine(): void
  {
    if (this.length > 0) {
      if (this.isBeautified) {
        this.lines.push(this.line + "\n")
      } else {
        this.lines.push(this.line)
      }
      this.line = ""
      this.length = 0
    }
  }


}