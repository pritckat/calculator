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
        num1 = num1.slice(0, -1)
        writeDisplay(display.textContent.slice(0, -1))
    } else if (num2 == "") {
        opp = ""
        temp = display.textContent.slice(0, -3)
        clearDisplay()
        writeDisplay(temp)
        num1Lock = false
    } else {
        num2 = num2.slice(0, -1)
        writeDisplay(display.textContent.slice(0, -1))
    }
}

function equals() {
    if (opp == "/" && (num2 == 0 || num2 == "")) {
        allClear()
        writePrevious("N/A")
    } else {
        let value = operate(opp, Number(num1), Number(num2))
        num1 = value.toString()
        num2 = ""
        opp = ""
        num1Lock = false
        writeDisplay(` = ${value}`)
        writePrevious(`${display.textContent}`)
        clearDisplay()
        writeDisplay(num1)
        document.getElementById("<<").disabled = true
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

function allClear() {
    num1 = ""
    num2 = ""
    num1Lock = false
    opp = ""
    clearDisplay()
    clearPrevious()
}

function assignValue(button) {
    document.getElementById("<<").disabled = false
    if (numbers.includes(Number(button.value))) {
        if (!num1Lock) {
            num1 = num1.concat(button.value)
            writeDisplay(button.value)
        } else {
            num2 = num2.concat(button.value)
            writeDisplay(button.value)
        }
    } 
    else if (operators.includes(button.value)) {
        if (opp == "") {
            opp = button.value
            num1Lock = true
            if (num1 == "") {
                writeDisplay(`0 ${opp} `)
            } else {
                writeDisplay(` ${opp} `)
            }
        } else {
            equals()
            document.getElementById("<<").disabled = false
            opp = button.value
            num1Lock = true
            if (num1 == "") {
                writeDisplay(`0 ${opp} `)
            } else {
                writeDisplay(` ${opp} `)
            }
        }
    } 
    else if (button.value == "=") { equals() }
    else if (button.value == "A/C") { allClear() }
    else if (button.value == "<<") { backspace() } 
    else { 
        console.log("Something went wrong!") 
        allClear()
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