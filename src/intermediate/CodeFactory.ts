import CodeImpl from './Impl/CodeImpl'
import CodeNodeImpl from './Impl/CodeNodeImpl'
import CodeNodeTypeImpl from './Impl/CodeNodeTypeImpl'

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