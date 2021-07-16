import BackendFactory from '../../src/backend/BackendFactory'
import FrontendFactory from '../../src/frontend/FrontendFactory'
import Source from '../../src/frontend/Source'

const evaluate: HTMLElement = document.getElementById("evaluate")


evaluate.onclick = function(e: any) {

    let context = (<HTMLInputElement> document.getElementById("context")).value
    let source = new Source((<HTMLInputElement> document.getElementById("expression")).value, context ? JSON.parse(context) : null)

    let parser = FrontendFactory.createParser("callback", source)
    let interpreter = BackendFactory.createBackend("callback")

    parser.parse()

    let iCode = parser.getICode()

    let targetInput = <HTMLInputElement> document.getElementById('evaluation')
    targetInput.value = interpreter.process(iCode, null)
}