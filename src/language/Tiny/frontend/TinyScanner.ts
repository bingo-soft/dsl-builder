import AbstractScanner from '../../../frontend/AbstractScanner'
import EofToken from '../../../frontend/EofToken'
import NumberToken from '../../../frontend/tokens/NumberToken'
import Source from '../../../frontend/Source'
import SpecialSymbolToken from '../../../frontend/tokens/SpecialSymbolToken'
import StringToken from '../../../frontend/tokens/StringToken'
import TokenInterface from '../../../frontend/TokenInterface'
import TinyTokenType from './TinyTokenType'

export default class TinyScanner extends AbstractScanner
{
  extractToken(): TokenInterface
  {
    this.skipWhiteSpace()
    const currentChar = this.currentChar()

    if (currentChar == Source.EOF) {
        return new EofToken(this.source)
    }

    if (!isNaN(parseInt(currentChar, 10))) {
        return new NumberToken(this.source)
    }

    if (currentChar == "'") {
        return new StringToken(this.source)
    }

    if (TinyTokenType.SPECIAL_SYMBOLS.includes(currentChar)) {
      return new SpecialSymbolToken(this.source)
    }
  }
}