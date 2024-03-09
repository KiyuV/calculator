// basic math functions
const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a,b) => a / b;

// Variables to store user input
let num1;
let num2;
let operator;

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            add(num1,num2);
            break;
        case '-':
            subtract(num1,num2);
            break;
        case 'x':
            multiply(num1,num2);
            break;
        case '÷':
            divide(num1,num2);
    }
}