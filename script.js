const operators = ["+", "-", "*", "/"]
const numbers = Array.from(new Array(10).keys())

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a,b) {
    return a / b
}

function operate(o, a, b) {
    switch(o) {
        case "+":
            return add(a, b)
        case "-":
            return subtract(a, b)
        case "*":
            return multiply(a, b)
        case "/":
            return divide(a, b)
    }
}

//const one = document.getElementById("1")
//one.onclick = function(){ console.log(one.value)}
console.log(numbers, operators)