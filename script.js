"use strict";
const out = document.querySelector(".calc-screen__p"); // get input in "out" there we will get result
const numbers = document.querySelectorAll(".numbers"); // get all nambers in const "numbers"
const signs = document.querySelectorAll(".sign"); // get alla signs in const "signs"
const equals = document.querySelector('.equals');// get equal sign (=) in const "equals"
const clear = document.querySelector('.clear'); //  get button clear (c) in const "clear"
const negative = document.querySelector('.negative'); // get button to change numbers positive or negative sign (+/-) in const "negative"
const percent = document.querySelector('.percent'); // persent
const comma = document.querySelector('.comma'); // fraction

// value of firs operand
let firstValue = "";
out.textContent = firstValue;
let isFirstValue = false;
// value of secont operand
let secondValue = "";
let isSecondValue = false;
// operator
let sign = "";
// result
let resultValue = 0;

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", (e) => {
        // takes all numbers and put EventListener on them

        let atr = e.target.getAttribute("data-value");
        // if value of first opernd is empty...
        if (isFirstValue === false) {
            getFirstValue(atr);
        }
        if (isSecondValue === false) {
            getSecondValue(atr);
        }
    });
}
// making function that will check errors
function checkError() {
    if(isNaN(resultValue))return true;
}
function getFirstValue(element) {
    //clean input
    out.textContent = "";
    firstValue += element;
    out.textContent = Number(firstValue);
    firstValue = +firstValue;
}
function getSecondValue(element) {
    if (firstValue !== '' && sign !== '') {
        secondValue += element;
        out.textContent = Number(secondValue);
        secondValue = +secondValue;
    }
}
function getSign(element) {
    for (let i = 0; i < signs.length; i++) {
        signs[i].addEventListener('click', (e) => {
            sign = e.target.getAttribute('data-value');
            isFirstValue = true;
        })
    }
}

function checkResultLength() {
    if (String(resultValue).length >= 8) {
        out.textContent = resultValue.toFixed(4);
    }
}

getSign();

equals.addEventListener('click', (e) => {
    out.textContent = '';
    if (sign === '+') {
        resultValue = firstValue + secondValue;
    } else if (sign === '-') {
        resultValue = firstValue - secondValue;
    } else if (sign === 'X') {
        resultValue = firstValue * secondValue;
    } else if (sign === '/') {
        resultValue = firstValue / secondValue;
    } // adding EventListener to decide with operation will happen on click on which operator 

    let isError = checkError();
    if (isError || resultValue === Infinity) {
        out.textContent = 'Error';
        firstValue = '';
        secondValue = '';
        isFirstValue = false;
        isSecondValue = false;
        sign = '';
    } else {
        out.textContent = resultValue
        firstValue = resultValue
        secondValue = '';
        checkResultLength()
    }
});
// Making possible to change sign before number
negative.addEventListener('click', () => {
    if ((firstValue !== null && firstValue !== undefined) && !secondValue) {
        firstValue = -firstValue;
        out.textContent = firstValue;
    } else {
        secondValue = -secondValue;
        out.textContent = secondValue;
    } 
});

// Operation to get persent of number
percent.addEventListener('click', () => {
    out.textContent = '';
    if (firstValue !== '') {
        resultValue = firstValue / 100;
        firstValue = resultValue;
    }
    if (firstValue !== '' && secondValue !== '' && sign !== '') {
        resultValue = resultValue / 100;
    }
    out.textContent = resultValue;
    checkResultLength();
});

// button clear
clear.addEventListener('click', () => {
    out.textContent = '';
    firstValue = '';
    isFirstValue = false;
    secondValue = '';
    isSecondValue = false;
    sign = '';
    resultValue = 0;
});

// fraction
comma.addEventListener('click', () => {
    if (firstValue && !secondValue) {
        firstValue += '.';
        out.textContent = firstValue;
    } else if (firstValue===0) {
        firstValue += '.';
        out.textContent = firstValue;
    } else if (secondValue===0) {
        secondValue += '.';
        out.textContent = secondValue;
    } 
    else {
        secondValue += '.';
        out.textContent = secondValue;
    }
});
