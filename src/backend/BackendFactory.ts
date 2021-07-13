import AbstractBackend from './AbstractBackend'
import { TinyInterpreter } from '../language/Tiny/backend/interpreters'
import { CallbackInterpreter } from '../language/Callback/backend/interpreters'

export default class BackendFactory
{
  static createBackend(lang: string): AbstractBackend | null
  {
    if (lang == "tiny") {
      return new TinyInterpreter()
    }
    if (lang == "callback") {
      return new CallbackInterpreter()
    }
    return null
  }
}