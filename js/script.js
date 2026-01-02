const calcNumbers = document.querySelectorAll(".button-num")
const operators = document.querySelectorAll(".button-operator")
const equalsButton = document.querySelector("#equals")

let total;
let operator;
let numA = null
let numB = null
let currentNum = []


function add(a, b) {
    total = a + b
    return total
}

function subtract(a, b) {
    total = a - b
    return total
}

function multiply(a, b){
    total = a * b
    return total
}

function divide(a, b){
    total = a / b
    return total
}

function operate(operator, numA, numB){
    switch (operator){
        case "+":
            add(numA, numB)
            break;
        case "-":
            subtract(numA, numB)
            break;
        case "x":
            multiply(numA, numB)
            break;
        case "&#247":
            divide(numA, numB)
            break;
    }
    return total
}

function saveInput(e){
    let num = e.target.textContent
    currentNum.push(num)
    return currentNum
}

function saveOperator(e){
    operator = e.target.textContent
    return operator
}

function saveNum(){
    if (numA === null){
        numA = Number(currentNum.join(""))
    } else {
        numB = Number(currentNum.join(""))
    }
    currentNum = []
}


calcNumbers.forEach(number => number.addEventListener("click", saveInput))
operators.forEach(operator => operator.addEventListener("click", (e) => {
    saveNum();
    saveOperator(e)
}))
equalsButton.addEventListener("click", () => {
    saveNum()
    operate(operator, numA, numB)
})




