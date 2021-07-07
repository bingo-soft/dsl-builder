import MessageListenerInterface from './MessageListenerInterface'
import MessageHandler from './MessageHandler'
import Message from './Message'

export default abstract class ListenableTrait
{
  protected static messageHandler: MessageHandler = new MessageHandler()

  addMessageListener(listener: MessageListenerInterface): void
  {
    ListenableTrait.messageHandler.addListener(listener)
  }
    
  removeMessageListener(listener: MessageListenerInterface): void
  {
    ListenableTrait.messageHandler.removeListener(listener)
  }
    
  sendMessage(message: Message): void
  {
    ListenableTrait.messageHandler.sendMessage(message);
  }
}