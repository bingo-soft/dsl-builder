import ExpressionParser from '../../src/language/Tiny/frontend/parsers/ExpressionParser'
import BackendFactory from '../../src/backend/BackendFactory'
import FrontendFactory from '../../src/frontend/FrontendFactory'
import Source from '../../src/frontend/Source'

const evaluate: HTMLElement = document.getElementById("evaluate")


evaluate.onclick = function(e: any) {

    let source = new Source((<HTMLInputElement> document.getElementById("expression")).value)

    let parser = FrontendFactory.createParser("tiny", source)
    let interpreter = BackendFactory.createBackend("tiny")

    parser.parse()

    let iCode = parser.getICode()

    alert(interpreter.process(iCode, null))
}