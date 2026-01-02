const calcNumbers = document.querySelectorAll(".button-num")
const operators = document.querySelectorAll(".button-operator")
const equalsButton = document.querySelector("#equals")
const screen = document.querySelector(".calc-screen-inner")
const calcButtons = document.querySelectorAll(".calc-button")
const clearButton = document.querySelector("#clear")
const clearEntryButton = document.querySelector("#ce")
const deleteButton = document.querySelector("#del")
const rndButton = document.querySelector("#rnd")

let history = {
    numHist: [],
    opHist: [],
    totalsHist: [],
    lastButtonClicked: null,
}

let calc = {
    numA: null,
    numB: null,
    operator: null,
    total: null,
    currentNum: [],
}

const calcReset = {
    numA: null,
    numB: null,
    operator: null,
    total: null,
    currentNum: [],
}

const historyReset = {
    numHist: [],
    opHist: [],
    totalsHist: [],
}

//----CALCULTATIONS---//

function add(a, b) {
    calc.total = a + b
    return calc.total
}

function subtract(a, b) {
    calc.total = a - b
    return calc.total
}

function multiply(a, b){
    calc.total = a * b
    return calc.total
}

function divide(a, b){
    calc.total = a / b
    return calc.total
}

function operate(){

    switch (calc.operator){
        case "+":
            add(calc.numA, calc.numB)
            break;
        case "-":
            subtract(calc.numA, calc.numB)
            break;
        case "x":
            multiply(calc.numA, calc.numB)
            break;
        case "÷":
            divide(calc.numA, calc.numB)
            break;
    }
    display()
    return calc.total
}

function saveInput(e){
    let num = e.target.textContent
    calc.currentNum.push(num)
    display()
    return calc.currentNum
}

function saveOperator(e){
    calc.operator = e.target.textContent
    display()
    return calc.operator
}

function saveNum(){
    if (calc.numA === null){
        calc.numA = Number(calc.currentNum.join(""))
    } else {
        calc.numB = Number(calc.currentNum.join(""))
    }
    calc.currentNum = []
}

function saveHistory() {
    history.numHist.push(calc.numA, calc.numB)
    history.totalsHist.push(calc.total)
    history.opHist.push(calc.operator)
}

function resetSingleValue(...values){
    values.forEach(value => () => {
        if (value.isArray()) {
            value = []
        } else {
            value = null
        }}
)}

function calcCheck(){
    if (calc.numA !== null && calc.numB !== null && calc.operator !== null) {
        operate()
        saveHistory()
        resetSingleValue(calc.numA, calc.numB, calc.operator)
        calc.numA = calc.total
        activeCalc = true
    } else if (history.lastButtonClicked === "=" || history.lastButtonClicked === "RND") {
        calc.numA = history.totalsHist[history.totalsHist.length - 1]
    }
    return
}

function clearAll(){
    calc = structuredClone(calcReset)
    display()
}

function clearCurrentNum(){
    calc.currentNum = []
    display()
}

function roundTotal(){
    calc.total = Math.round(history.totalsHist[history.totalsHist.length - 1])
    screen.textContent = calc.total
    history.totalsHist.push(calc.total)
    return
}


//---DISPLAY---//
function display() {
    if (calc.total != null && calc.operator === null) {
        screen.textContent = calc.total
    } else if (calc.total !=null && calc.operator != null){
        screen.textContent = calc.total + " " + calc.operator + " " + calc.currentNum.join("")
    } else if (calc.numA !== null && calc.operator !== null){
        screen.textContent = calc.numA + " " + calc.operator + " " + calc.currentNum.join("")
    } else if (calc.numA === null) {
        screen.textContent = calc.currentNum.join("")
    } else {
        screen.textContent = "ERROR"
    }
}

//---EVENT LISTENERS---//

calcNumbers.forEach(number => number.addEventListener("click", saveInput))

operators.forEach(operator => operator.addEventListener("click", (e) => {
    saveNum()
    calcCheck()
    saveOperator(e)
}))

equalsButton.addEventListener("click", () => {
    saveNum()
    operate()
    screen.textContent = calc.total
    history.totalsHist.push(calc.total)
    calc = structuredClone(calcReset)
})

clearButton.addEventListener("click", clearAll)

clearEntryButton.addEventListener("click", clearCurrentNum)

calcButtons.forEach(button => button.addEventListener("click", (e) => history.lastButtonClicked = e.target.textContent))

rndButton.addEventListener("click", roundTotal)