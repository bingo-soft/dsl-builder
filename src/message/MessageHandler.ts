import Message from './Message'
import MessageListenerInterface from './MessageListenerInterface'

export default class MessageHandler {
  private message: Message

  private listeners: MessageListenerInterface[] = []

  addListener(listener: MessageListenerInterface): void
  {
    this.listeners.push(listener)
  }

  removeListener(listener: MessageListenerInterface): void
  {
    let id: number;
    if ((id = this.listeners.indexOf(listener)) != -1) {
      delete this.listeners[id]
    }
  }
    
  sendMessage(message: Message): void
  {
    this.message = message
    this.notifyListeners()
  }
    
  notifyListeners(): void
  {
    this.listeners.forEach(listener => {
      listener.messageReceived(this.message)
    })
  }
}