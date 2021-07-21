import BackendFactory from '../../src/backend/BackendFactory'
import FrontendFactory from '../../src/frontend/FrontendFactory'
import Source from '../../src/frontend/Source'

test('1 + 2 == 3', () => {
    let source = new Source("return 1 + 2")

    let parser = FrontendFactory.createParser("callback", source)
    let interpreter = BackendFactory.createBackend("callback")

    parser.parse()

    let iCode = parser.getICode()

    expect(interpreter.process(iCode, null)).toBe(3)
})