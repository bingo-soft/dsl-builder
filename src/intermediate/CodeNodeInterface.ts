import CodeNodeTypeInterface from './CodeNodeTypeInterface'

export default interface CodeNodeInterface
{
  equals(node: CodeNodeInterface): boolean

  getType(): CodeNodeTypeInterface

  setParent(node: CodeNodeInterface | null): void
    
  getParent(): CodeNodeInterface | null
    
  setRoot(): void
    
  isRoot(): boolean
    
  addChild(node: CodeNodeInterface | null): CodeNodeInterface | null
    
  addChildren(nodes: CodeNodeInterface[]): void
    
  getChildren(): CodeNodeInterface[]

  setAttribute(key: string, value: unknown): void
    
  getAttribute(key: string): unknown
    
  getAttributes(): { [key: string]: unknown }
    
  copy(): CodeNodeInterface
    
  getText(): string
}
