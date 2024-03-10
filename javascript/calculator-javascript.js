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
let pressedEqual = false;

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

// functions to send input to the calculator's display
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
        // when an operator is pressed after = (adding an expression to current answer)
        if (pressedEqual === true) {
            console.log('top');
            onSubScreen = '';
            operator = operatr.textContent;
            setSubScreen(`${num1} ${operator} `);
            onScreen = '';
            setScreen('');
            pressedEqual = false;

        } 
        // when the user has entered one number and presses the operator instead of = (continuing the expressio without pressing =)
        else if (num1 !== undefined && num2 === undefined) {
            console.log('middle');
            num2 = Number(onScreen);
            ans = operate(operator, num1, num2);
            operator = operatr.textContent;
            onSubScreen = '';
            setSubScreen(`${ans} ${operator} `);
            onScreen = '';
            setScreen('');

            num1 = ans;
            num2 = undefined;
        } 
        // when no numbers have be entered
        else {
            console.log('bottom');
            num1 = Number(onScreen);
            operator = operatr.textContent;
            setSubScreen(`${onScreen} ${operator} `);
            onScreen = '';
            setScreen('');
        }
    })
})

equals.addEventListener('click', () => {
    num2 = Number(onScreen);
    ans = operate(operator, num1, num2);
    setSubScreen(`${num2} =`);
    onScreen = '';
    setScreen(`${ans}`);

    num1 = ans;
    num2 = undefined;
    pressedEqual = true;
})