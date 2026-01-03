const screen = document.querySelector(".calc-screen-inner")
const calcButtons = document.querySelectorAll(".calc-button")


//===VARIABLES===//
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
        case "/":
            divide(calc.numA, calc.numB)
            break;
    }
    display()
    return calc.total
}

//---STATE HANDLING ---//
function saveInput(e){
    let num;
    if (e.key) {
        num = e.key
    } else {
        num = e.target.textContent
    }
    calc.currentNum.push(num)
    display()
    return calc.currentNum
}

function saveOperator(e){
    if (e.key){
        if (["+","-","x","÷","/"].includes(e.key)) {
            calc.operator = e.key
        } else if (e.key === "*") {
            calc.operator = "x"
        }
    } else {
        calc.operator = e.target.textContent
    }
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


function calcCheck(){
    if (calc.numA !== null && calc.numB !== null && calc.operator !== null) {
        operate()
        saveHistory()
        calc.numA = calc.total
    } else if (history.lastButtonClicked === "=" || history.lastButtonClicked === "Enter" || history.lastButtonClicked === "RND") {
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

function clearOperator(){
    calc.operator = null
    display()
}

function roundTotal(){
    calc.total = Math.round(history.totalsHist[history.totalsHist.length - 1])
    screen.textContent = calc.total
    history.totalsHist.push(calc.total)
    return
}


function minusOrSubtract(e) {
    if (history.lastButtonClicked === "=" || history.lastButtonClicked === "Enter") {
        calcCheck();
        saveOperator(e);
        return;
    }

    if (history.lastButtonClicked === "-") {
        saveInput(e)
        return;
    }

    if (calc.currentNum.length === 0) {
        saveInput(e);
        return;
    }
    
    saveNum();
    calcCheck();
    saveOperator(e);
}

function handleButtonOnClick(e){
    const value = e.target

    switch (true) {

        case value.id === "minus":
        case e.key === "-":
            minusOrSubtract(e)
            break;

        case value.classList.contains("button-num"):
        case !isNaN(e.key):
            saveInput(e)
            break;

        case value.classList.contains("button-operator"):
        case e.key === "+":
        case e.key === "*":
        case e.key === "/":
        case e.key === "x":
        case e.key === "÷":
            saveNum()
            calcCheck()
            saveOperator(e)
            break;

        case value.id === "equals":
        case e.key === "=":
        case e.key === "Enter":
            saveNum()
            operate()
            screen.textContent = calc.total
            history.totalsHist.push(calc.total)
            calc = structuredClone(calcReset)
            break;

        case value.id === "clear":
        case e.key === "Escape":
        case e.key === "c":
            clearAll()
            break;

        case value.id === "ce":
        case e.key === "Backspace":
            if (!isNaN(history.lastButtonClicked)){
                clearCurrentNum()
            } else if (history.lastButtonClicked === ["+","-","x","*","÷","/"].includes(e.key))  {
                clearOperator()
            }
            break;

        case value.id === "rnd":
        case e.key === "r":
            roundTotal()
            calcCheck()
            break;
        
        case value.id === "deci":
        case e.key === ".":
            if (!calc.currentNum.includes(".")) {
                saveInput(e);
            }
            break;
    }
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
    } else if (calc.numA !== null && calc.operator === null) {
        screen.textContent = calc.numA
    } else {
        screen.textContent = "ERROR"
    }
    screen.scrollLeft = screen.scrollWidth;
}

//---EVENT LISTENERS---//
calcButtons.forEach(button => button.addEventListener("click", (e) => {
    handleButtonOnClick(e)
    history.lastButtonClicked = e.target.textContent
    }))

document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key)) {
        handleButtonOnClick(e)
    } else if (["x","*","/","÷",".","r","+","-","Escape","Enter","Backspace","c"].includes(e.key)) {
        handleButtonOnClick(e)
    }
    history.lastButtonClicked = e.key
})