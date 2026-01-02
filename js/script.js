let total;

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