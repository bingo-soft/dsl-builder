import TokenTypeInterface from './TokenTypeInterface'

export default interface TokenInterface
{
    getLineNumber(): number

    getPosition(): number

    getText(): string

    getType(): TokenTypeInterface | null

    getValue(): any

    getContextValue(key: string): any
}