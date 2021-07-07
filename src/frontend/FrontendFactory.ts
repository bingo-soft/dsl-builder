import AbstractParser from './AbstractParser'
import Source from './Source'

export default class FrontendFactory
{
  static createParser(language: string, source: Source): AbstractParser | null
  {
    return null
  }
}