import Message from './Message'

export default interface MessageListenerInterface {
  messageReceived(message: Message): void
}