import AbstractParser from './AbstractParser'
import Source from './Source'
import TinyParser from '../language/Tiny/frontend/TinyParser'
import TinyScanner from '../language/Tiny/frontend/TinyScanner'

export default class FrontendFactory
{
  static createParser(lang: string, source: Source): AbstractParser | null
  {
    if (lang == "tiny") {
      return new TinyParser(new TinyScanner(source))
    }
    return null
  }
}