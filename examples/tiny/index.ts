const evaluate: HTMLElement = document.getElementById("evaluate")

evaluate.onclick = function(e: any) {
    alert((<HTMLInputElement> document.getElementById("expression")).value)
}