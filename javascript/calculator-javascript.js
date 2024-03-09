// Query Selectors
const screen = document.querySelector('#screen');
const statusScreen = document.querySelector('#hist');
const numpad = [...document.querySelectorAll('.num')];
const operators = [...document.querySelectorAll('.operator')];
const equals = document.querySelector('#equals');

// Variables to store user input
let num1;
let num2;
let operand;

let onScreen = '';
let onStatusScreen = '';

// Basic Math operations
const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

const toScreen = (string) => {
    screen.textContent = `${onScreen}${string}`;
    onScreen = screen.textContent;
}

const toStatusScreen = (string) => {
    statusScreen.textContent = `${onStatusScreen}${string}`;
    onStatusScreen = statusScreen.textContent;
}

const operate = (operand, num1, num2) => {
    switch (operand) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '÷':
            return divide(num1, num2);
    }
}

numpad.map((number) => {
    number.addEventListener('click', () => {
        toScreen(number.textContent);
    });
});

operators.map((operator) => {
    operator.addEventListener('click', () => {
        num1 = Number(onScreen);
        operand = operator.textContent;
        toStatusScreen(`${onScreen} ${operand} `);
        screen.textContent = onScreen = '';
    });
});

equals.addEventListener('click', () => {
    num2 = Number(onScreen);
    toStatusScreen(`${onScreen} =`)
    onScreen = '';
    toScreen(operate(operand, num1, num2)); 
});