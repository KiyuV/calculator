// basic math functions
const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a,b) => {
    if (b === 0) {
        return 'ERROR';
    } else {
        return Math.round(((a/b)*100))/100;
    }
} 

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
const leftBtns = [...document.querySelectorAll('.btns-left')];
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
            num1 !== Number(onScreen) ? num1 = Number(onScreen) : num1;
            console.log('top');
            onSubScreen = '';
            operator = operatr.textContent;
            setSubScreen(`${num1} ${operator} `);
            onScreen = '';
            setScreen('');
            pressedEqual = false;
        }
        else if (onSubScreen.includes('%')) {
            num1 = Number(onScreen);
            operator = operatr.textContent;
            onScreen = '';
            setScreen('');
            onSubScreen = '';
            setSubScreen(`${num1} ${operator} `);
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
        // when no numbers have been entered
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
    // when you user inputs a number without an operator 
    if (num1 === undefined) {
        num1 = Number(onScreen);
        setSubScreen(`${num1} =`);
        onScreen = '';
        setScreen(`${num1}`);
    }
    // normal operation when the user pressed an operator, a second number and equals
    else {
        // when an operator and equals is pressed without enterting a second number (incomplete expression, eg. 12 +=) assign it to num1
        onScreen === '' ? num2 = num1 : num2 = Number(onScreen);
        ans = operate(operator, num1, num2);
        num2 > 0 ?  setSubScreen(`${num2} =`) : setSubScreen(`( ${num2} ) =`);
        onScreen = '';
        setScreen(`${ans}`);

        num1 = ans;
        num2 = undefined;
        pressedEqual = true;
    }
})

leftBtns.map((btn) => {
    let currentBtn = btn.textContent;
    btn.addEventListener('click', () => {
        switch (currentBtn) {
            // resets all stored data on the calculator
            case 'CE':
                num1 = undefined;
                num2 = undefined;
                operator = undefined;
                ans = undefined;
                pressedEqual = false;
                onScreen = '';
                onSubScreen = '';
                setScreen('');
                setSubScreen('');
                break;
            case 'C':
                onScreen = ('');
                setScreen('');
                break;
            case 'arrow_forward_ios':
                let backspace = onScreen.slice(0, -1);
                onScreen = '';
                setScreen('');
                setScreen(backspace);
                break;
            case '+/-':
                let tmp = Number(onScreen);
                tmp *= -1;
                onScreen = '';
                setScreen(`${tmp}`);
                break;
            case '%':
                let percent = Number(onScreen);
                let percentage = multiply(num1, percent/100);
                onScreen = '';
                setScreen(`${percentage}`);
                setSubScreen(`${percent}% =`);
                num1 = percentage;
                break;
        }
    })
})