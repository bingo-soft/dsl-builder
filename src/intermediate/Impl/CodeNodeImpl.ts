import CodeNodeInterface from '../CodeNodeInterface'
import CodeNodeTypeInterface from '../CodeNodeTypeInterface'
import CodeFactory from '../CodeFactory'

export default class CodeNodeImpl implements CodeNodeInterface
{
  private type: CodeNodeTypeInterface

  private parent: CodeNodeInterface

  private children: CodeNodeInterface[] = []

  private attributes: { [key: string]: unknown } = {}

  private isRoot_ = false

  constructor(type: CodeNodeTypeInterface)
  {
    this.type = type
  }

  equals(node: CodeNodeInterface): boolean
  {
    for (const key in this.attributes) {
      if (!Object.prototype.hasOwnProperty.call(node.getAttributes(), key) || node.getAttributes()[key] != this.attributes[key]) {
        return false
      } 
    }
    return true
  }

  getType(): CodeNodeTypeInterface
  {
    return this.type
  }

  getParent(): CodeNodeInterface | null
  {
    return this.parent
  }

  setParent(node: CodeNodeInterface | null): void
  {
    this.parent = node
  }

  setRoot(): void
  {
    this.isRoot_ = true;
  }

  isRoot(): boolean
  {
    return this.isRoot_
  }

  addChild(node: CodeNodeInterface | null): CodeNodeInterface | null
  {
    if (node != null) {
      this.children.push(node)
      node.setParent(this)
    }
      
    return node;
  }

  addChildren(nodes: CodeNodeInterface[]): void
  {
    if (nodes.length) {
      nodes.forEach(node => {
        this.addChild(node)
      })
    }
  }

  getChildren(): CodeNodeInterface[]
  {
    return this.children
  }

  setAttribute(key: string, value: unknown): void
  {
    this.attributes[key] = value
  }

  getAttribute(key: string): unknown
  {
    if (Object.prototype.hasOwnProperty.call(this.attributes, key)) {
      return this.attributes[key]
    }
    return null
  }

  getAttributes(): { [key: string]: unknown }
  {
    return this.attributes
  }

  copy(): CodeNodeInterface
  {
    const copy = CodeFactory.createCodeNode(this.type)

    for (const key in this.attributes) {
      copy.setAttribute(key, this.attributes[key])
    }
     
    return copy
  }

  getText(): string
  {
    return <string> this.type
  }

}