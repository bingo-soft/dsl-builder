import AbstractBackend from './AbstractBackend'
import { TinyInterpreter } from '../language/Tiny/backend/interpreters'

export default class BackendFactory
{
  static createBackend(lang: string): AbstractBackend | null
  {
    if (lang == "tiny") {
      return new TinyInterpreter()
    }
    return null
  }
}