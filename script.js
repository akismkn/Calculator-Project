// Functions for basic arithmetic operations
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Error: Division by zero';
    } else {
        return a / b;
    }
}

// Variables to store numbers, operator, and display
let number1 = 0;
let number2 = 0;
let operator;

// Function to perform arithmetic operation based on operator
function operate(number1, operator, number2) {
    let result = 0;
    number1 = Number(number1);
    number2 = Number(number2);

    // Check for division by zero before performing division
    if (operator === '÷' && number2 === 0) {
        return 'Error: Division by zero';
    }
    // Switch statement to determine the operation to perform
    switch (operator) {
        case '+':
            result = add(number1, number2);
            break;
        case '-':
            result = subtract(number1, number2);
            break;
        case '×':
            result = multiply(number1, number2);
            break;
        case '÷':
            result = divide(number1, number2);
            break;
    }
    // Return the result of the operation
    return result;
}


// Variables to track state and display
let check = 0;
let displayText = '';
let changeDisplay = document.querySelector('.display');

// Event listeners for number buttons
let numButtons = document.querySelectorAll('.numberButton');
numButtons.forEach(function (numButton) {
    numButton.addEventListener('click', function () {
        if (operator !== undefined) {
            // If an operator is present, update number2
            number2 = number2 * 10 + Number(numButton.textContent);
            displayText = displayText + numButton.textContent;
        } else {
            // If no operator is present, update number1
            number1 = number1 * 10 + Number(numButton.textContent);
            displayText = displayText + numButton.textContent; // This line appends the new digit
        }
        display(displayText);
    });
    
});

// Event listeners for operator buttons
let opButtons = document.querySelectorAll('.operatorButton');
opButtons.forEach(function (opButton) {
    opButton.addEventListener('click', function () {
        if (operator === undefined) {
            // If no operator is set, update the operator
            operator = opButton.textContent;
            displayText = displayText + operator;
        } else {
            // If an operator is set, perform the previous operation and update the operator
            number1 = operate(number1, operator, number2);
            number2 = 0;
            operator = opButton.textContent;
            displayText = number1 + operator;
        }
        display(displayText);
    });
});

// Event listener for the equals button
let equal = document.querySelector('.equal');
equal.addEventListener('click', function () {
    if (operator !== undefined && number2 !== 0) {
        // If both numbers and an operator are present, perform the operation and display the result
        number1 = operate(number1, operator, number2);
        number2 = 0;
        operator = undefined;
        displayText = number1.toString(); // Update displayText with the result
        display(displayText);
    } else {
        // Handle the case when the division by zero occurs
        display('Error');
        number1 = 0;
        number2 = 0;
        operator = undefined;
    }
});


// Event listener for the clear button
let clear = document.querySelector('.clear');
clear.addEventListener('click', function () {
    // Clear all variables and reset the display
    number1 = 0;
    number2 = 0;
    operator = undefined;
    displayText = '0';
    display(displayText);
});

// Function to update the display
function display(displayText) {
    changeDisplay.textContent = displayText;
}
