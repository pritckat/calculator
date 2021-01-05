const operators = ["+", "-", "*", "/"]
const otherButtons = ["=", "<<", "A/C"]
const numbers = Array.from(new Array(10).keys())
const operatorDiv = document.getElementById("operators")
const numberDiv = document.getElementById("numbers")
const otherButtonsDiv = document.getElementById("otherButtons")
const display = document.getElementById("display")
const previous = document.getElementById("previous")

let num1 = ""
let num1Lock = false
let num2 = ""
let opp = ""
let answer

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

function backspace() {
    if (!num1Lock) {
        console.log("backspace")
        num1 = num1.slice(0, -1)
        console.log(`num1 is ${num1}`)
        display.textContent = display.textContent.slice(0, -1)
    } else if (num2 == "") {
        opp = ""
        display.textContent = display.textContent.slice(0, -3)
        console.log("backspace")
        console.log(`opp is ${opp}`)
        num1Lock = false
    } else {
        num2 = num2.slice(0, -1)
        display.textContent = display.textContent.slice(0, -1)
        console.log(`num2 is ${num2}`)
    }
}

function writeDisplay(thing) {
    display.textContent += thing
}

function clearDisplay() {
    display.textContent = ""
}

function writePrevious(thing) {
    previous.textContent = thing
}

function clearPrevious() {
    previous.textContent = ""
}

function assignValue(button) {
    document.getElementById("<<").disabled = false
    if (numbers.includes(Number(button.value))) {
        if (!num1Lock) {
            num1 = num1.concat(button.value)
            console.log(`num1 is ${num1}`)
            writeDisplay(button.value)
        } else {
            num2 = num2.concat(button.value)
            console.log(`num2 is ${num2}`)
            writeDisplay(button.value)
        }
    } else if (operators.includes(button.value)){
        console.log(opp)
        if (opp == "") {
            opp = button.value
            num1Lock = true
            console.log(`operator is ${opp}`)
            console.log(num1Lock)
            if (num1 == "") {
                writeDisplay(`0 ${opp} `)
            } else {
                writeDisplay(` ${opp} `)
            }
        }

    } else if (button.value == "=") {
        console.log("equals")
        if ((opp == "/" && num2 == 0 || num2 == "")) {
            console.log("no")
        } else {
            let value = operate(opp, Number(num1), Number(num2))
            num1 = value.toString()
            console.log(`num1 is ${num1}`)
            num2 = ""
            opp = ""
            num1Lock = false
            console.log(value)
            writeDisplay(` = ${value}`)
            writePrevious(`${display.textContent}`)
            clearDisplay()
            writeDisplay(num1)
            document.getElementById("<<").disabled = true
        }
    } else if (button.value == "A/C") {
        num1 = ""
        num2 = ""
        num1Lock = false
        opp = ""
        console.log(`${num1} ${num2} ${num1Lock} ${opp}`)
        clearDisplay()
        clearPrevious()
    } else if (button.value == "<<") {
        backspace()
    }
        else {
        console.log("Something went wrong!")
    }

}

for (i=0; i < operators.length; i++) {
    let b = document.createElement("button")
    b.value = operators[i]
    b.id = operators[i]
    b.textContent = operators[i]
    operatorDiv.appendChild(b)
    b.onclick = function(){assignValue(b)}
}

for (i=0; i < numbers.length; i++) {
    let b = document.createElement("button")
    b.value = numbers[i]
    b.id = numbers[i]
    b.textContent = numbers[i]
    numberDiv.appendChild(b)
    b.onclick = function(){ assignValue(b)}
}

for (i=0; i< otherButtons.length; i++) {
    let b = document.createElement("button")
    b.value = otherButtons[i]
    b.id = otherButtons[i]
    b.textContent = otherButtons[i]
    otherButtonsDiv.appendChild(b)
    b.onclick = function(){assignValue(b)}
}