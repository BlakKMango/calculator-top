const calcNumbers = document.querySelectorAll(".button-num")
const operators = document.querySelectorAll(".button-operator")
const equalsButton = document.querySelector("#equals")

let history = {
    numHist: [],
    opHist: [],
    totalsHist: [],
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
        case "&#247":
            divide(calc.numA, calc.numB)
            break;
    }

    return calc.total
}

function saveInput(e){
    let num = e.target.textContent
    calc.currentNum.push(num)
    return calc.currentNum
}

function saveOperator(e){
    calc.operator = e.target.textContent
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
    if (calc.numA != null && calc.numB != null && calc.operator != null) {
        operate()
        saveHistory()
        resetSingleValue(calc.numA, calc.numB, calc.operator)
        calc.numA = calc.total
    }
    return
}

//---DISPLAY---//



calcNumbers.forEach(number => number.addEventListener("click", saveInput))

operators.forEach(operator => operator.addEventListener("click", (e) => {
    calcCheck()
    saveNum()
    saveOperator(e)
}))


equalsButton.addEventListener("click", () => {
    saveNum()
    operate()
})




