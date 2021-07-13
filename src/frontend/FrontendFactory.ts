import AbstractParser from './AbstractParser'
import Source from './Source'
import { TinyParser } from '../language/Tiny/frontend/parsers'
import TinyScanner from '../language/Tiny/frontend/TinyScanner'
import { CallbackParser } from '../language/Callback/frontend/parsers'
import CallbackScanner from '../language/Callback/frontend/CallbackScanner'

export default class FrontendFactory
{
  static createParser(lang: string, source: Source): AbstractParser | null
  {
    if (lang == "tiny") {
      return new TinyParser(new TinyScanner(source))
    }
    if (lang == "callback") {
      return new CallbackParser(new CallbackScanner(source))
    }
    return null
  }
}