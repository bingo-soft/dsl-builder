import CodeImpl from './impl/CodeImpl'
import CodeNodeImpl from './impl/CodeNodeImpl'
import CodeNodeTypeImpl from './impl/CodeNodeTypeImpl'

export default class CodeFactory
{
  static createCode(): CodeImpl
  {
    const root = new CodeNodeImpl(CodeNodeTypeImpl.SCRIPT)
    root.setRoot()
    return new CodeImpl(root)
  }

  static createCodeNode(type: CodeNodeTypeImpl): CodeNodeImpl
  {
    return new CodeNodeImpl(type)
  }
}