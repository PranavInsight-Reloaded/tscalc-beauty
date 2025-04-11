"use strict";
let currentInput = '0';
let previousInput = '';
let operation = null;
let resetInput = false;
const display = document.getElementById('display');
function updateDisplay() {
    if (display) {
        display.value = currentInput;
    }
}
function addToDisplay(value) {
    if (currentInput === '0' || resetInput) {
        currentInput = value;
        resetInput = false;
    }
    else {
        currentInput += value;
    }
    updateDisplay();
}
function addOperator(op) {
    if (operation !== null) {
        calculate();
    }
    previousInput = currentInput;
    operation = op;
    resetInput = true;
    // Update operator button styling
    document.querySelectorAll('.operator').forEach(btn => {
        btn.classList.remove('selected');
    });
    const target = event === null || event === void 0 ? void 0 : event.target;
    if (target && target.classList) {
        target.classList.add('selected');
    }
}
function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) {
        return;
    }
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    if (computation !== undefined) {
        currentInput = computation.toString();
        operation = null;
        resetInput = true;
        updateDisplay();
        // Remove operator selection
        document.querySelectorAll('.operator').forEach(btn => {
            btn.classList.remove('selected');
        });
    }
}
function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
    // Remove operator selection
    document.querySelectorAll('.operator').forEach(btn => {
        btn.classList.remove('selected');
    });
}
function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}
function percentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}
// Initialize display
updateDisplay();
