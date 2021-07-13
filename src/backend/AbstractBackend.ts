import CodeInterface from '../intermediate/CodeInterface'
import ListenableTrait from '../message/ListenableTrait'
import MessageProducerInterface from '../message/MessageProducerInterface'
import SymTabStackInterface from '../intermediate/SymTabStackInterface'

export default abstract class AbstractBackend  extends ListenableTrait implements MessageProducerInterface
{
  protected symTabStack: SymTabStackInterface

  protected iCode: CodeInterface

  constructor()
  {
    super()
  }

  abstract process(iCode: CodeInterface, symTabStack: SymTabStackInterface | null, context?: any): any
}