const calcNumbers = document.querySelectorAll(".button-num")
const operators = document.querySelectorAll(".button-operator")

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

function operate(operator, a, b){
    switch (operator){
        case "+":
            add(a, b)
            break;
        case "-":
            subtract(a, b)
            break;
        case "x":
            multiply(a, b)
            break;
        case "&#247":
            divide(a, b)
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



