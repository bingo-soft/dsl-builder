import CodeNodeInterface from './CodeNodeInterface'

export default interface CodeInterface
{
  setRoot(node: CodeNodeInterface): void
  getRoot(): CodeNodeInterface
}