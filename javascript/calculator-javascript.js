// basic math functions
const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a,b) => a / b;

// Variables to store user input
let num1;
let num2;
let operator;
let ans;

let onScreen = '';
let onSubScreen = '';

// Query Selectos
const numpad = [...document.querySelectorAll('.num')];
const operators = [...document.querySelectorAll('.operator')];
const equals = document.querySelector('#equals');
const screen = document.querySelector('#screen');
const subScreen = document.querySelector('#hist');

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1,num2);
        case '-':
            return subtract(num1,num2);
        case 'x':
            return multiply(num1,num2);
        case '÷':
            return divide(num1,num2);
    }
}

function setScreen(string) {
    onScreen = screen.textContent = `${onScreen}${string}`;
}

function setSubScreen(string) {
    onSubScreen = subScreen.textContent = `${onSubScreen}${string}`
}

numpad.map((number) => {
    number.addEventListener('click', () => {
        setScreen(number.textContent);
    })
})

operators.map((operatr) => {
    operatr.addEventListener('click', () => {
        num1 = Number(onScreen);
        operator = operatr.textContent;
        setSubScreen(`${onScreen} ${operator} `);
        onScreen = '';
        setScreen('');
    })
})

equals.addEventListener('click', () => {
    num2 = Number(onScreen);
    ans = operate(operator, num1, num2);
    setSubScreen(`${num2} =`);
    onScreen = '';
    setScreen(`${ans}`);
})