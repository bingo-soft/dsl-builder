import CodeInterface from '../intermediate/CodeInterface'
import ListenableTrait from '../message/ListenableTrait'
import MessageProducerInterface from '../message/MessageProducerInterface'
import SymTabInterface from '../intermediate/SymTabInterface'

export default abstract class AbstractBackend  extends ListenableTrait implements MessageProducerInterface
{
  private symTab: SymTabInterface

  protected iCode: CodeInterface

  constructor()
  {
    super()
  }

  abstract process(iCode: CodeInterface, symTab: SymTabInterface | null): void
}