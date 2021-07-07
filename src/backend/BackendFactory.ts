import AbstractBackend from './AbstractBackend'

export default class BackendFactory
{
  static createBackend(language: string): AbstractBackend | null
  {
    return null
  }
}