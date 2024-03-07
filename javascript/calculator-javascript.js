// Query Selectors
const screen = document.querySelector('#screen');
const statusScreen = document.querySelector('#hist');
const numpad = [...document.querySelectorAll('.num')];
const operators = [...document.querySelectorAll('.operator')];
const equals = document.querySelector('#equals');

// Variables to store user input
let num1;
let num2;

let onScreen = '';

// Basic Math operations
const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

const toScreen = (btn) => {
    screen.textContent = `${onScreen}${btn.textContent}`;
    onScreen = screen.textContent;
}

const toStatusScreen = (btn) => {
    statusScreen.textContent = `${onScreen} ${btn.textContent}`;
    console.log(statusScreen.textContent);
}

numpad.map((number) => {
    number.addEventListener('click', () => {
        toScreen(number);
    });
});

operators.map((operator) => {
    operator.addEventListener('click', () => {
        num1 = Number(onScreen);
        toStatusScreen(operator);
        screen.textContent = onScreen = '';
    });
});

equals.addEventListener('click', () => {
    num2 = Number(onScreen);
    let operand = statusScreen.textContent.slice(-1);
    statusScreen.textContent = `${statusScreen.textContent} ${onScreen} = `;
    
    switch (operand) {
        case '+':
            screen.textContent = add(num1, num2);
            break;
        case '-':
            screen.textContent = subtract(num1, num2);
            break;
        case 'x':
            screen.textContent = multiply(num1, num2);
            break;
        case '÷':
            screen.textContent = divide(num1, num2);
            break;
    }
});