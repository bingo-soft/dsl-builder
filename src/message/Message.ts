import { MessageType } from './MessageType'

export default class Message {
  private type: MessageType
  
  private body: unknown[] = []

  constructor(type: MessageType, body: unknown[])
  {
    this.type = type
    this.body = body
  }

  getType(): MessageType
  {
    return this.type
  }

  getBody(): unknown[]
  {
    return this.body
  } 
}