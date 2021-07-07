import MessageListenerInterface from './MessageListenerInterface'
import Message from './Message'

export default interface MessageProducerInterface {
  addMessageListener(listener: MessageListenerInterface): void

  removeMessageListener(listener: MessageListenerInterface): void

  sendMessage(message: Message): void
}