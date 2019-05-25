$(document).ready(initializeApp);

function initializeApp () {
    attachClickHandlers();
}

function attachClickHandlers () {
    $("#c-button").on("click", cButtonHandler);
    $("#ac-button").on("click", acButtonHandler);
    $("#number-block").on("click", ".number", numberButtonHandler);
    $("#decimal").on("click", decimalButtonHandler);
    $("#equals").on("click", equalsButtonHandler);
    $("#operator-column").on("click", ".operator", operatorButtonHandler);
}

//global variable space

var calculationArray = [];
var displayArray = [];
var stringNumberToPush = "";
var calculationResult = null;



function cButtonHandler (event) {
    console.log("event", event);
}

function acButtonHandler (event) {
    calculationArray = [];
    displayArray = [];
    stringNumberToPush = "";
    displayArray[0] = 0;
    updateDisplay();
    displayArray = [];
}

function numberButtonHandler (event) {
    var inputtedNumber = "";
    if (calculationArray.length === 0) {
        inputtedNumber = $(event.currentTarget).find("p").text();
        stringNumberToPush += inputtedNumber;
        displayArray.push(inputtedNumber);
        updateDisplay();
        console.log(stringNumberToPush);
        return;
    }
    if (calculationArray[calculationArray.length-1] === "+" || calculationArray[calculationArray.length-1] === "-" ||calculationArray[calculationArray.length-1] === "*" || calculationArray[calculationArray.length-1] === "/" ) {
        inputtedNumber = $(event.currentTarget).find("p").text();
        stringNumberToPush += inputtedNumber;
        displayArray.push(inputtedNumber);
        updateDisplay();
        console.log(stringNumberToPush);
        return;
    }
    return;

}
function operatorButtonHandler (event) {
    if (stringNumberToPush === "" && !calculationResult) {
        return;
    }
    calculationArray.push(stringNumberToPush);
    var inputtedOperator = $(event.currentTarget).find("p").text();
    calculationArray.push(inputtedOperator);
    displayArray.push(inputtedOperator);
    updateDisplay();
    stringNumberToPush = "";
    console.log(calculationArray);

}
function updateDisplay () {
    var displayText = displayArray.join("");

    $("#display-text").text(displayText);

}

function decimalButtonHandler (event) {
    console.log("event", event);
}

function equalsButtonHandler (event) {
    if(stringNumberToPush !== "") {
        calculationArray.push(stringNumberToPush);
        stringNumberToPush = "";
    }
    if (calculationArray[calculationArray.length-1] === "+" || calculationArray[calculationArray.length-1] === "-" ||calculationArray[calculationArray.length-1] === "*" || calculationArray[calculationArray.length-1] === "/" ) {
        return;
    }
    displayArray = [];


    while (calculationArray.length > 1) {
        for (var calcIndex = 0; calcIndex < calculationArray.length; calcIndex++) {
            if( calculationArray[calcIndex] === "*" || calculationArray[calcIndex] === "/"){
                var pemCalc = calculate(calculationArray[calcIndex-1], calculationArray[calcIndex+1], calculationArray[calcIndex]);
                // var stringNumber = pemCalc.toString();
                calculationArray.splice(calcIndex-1, 3, pemCalc);
                console.log(calculationArray);
                --calcIndex;
            }

        }
        for (var calcIndex = 0; calcIndex < calculationArray.length; calcIndex++) {
            if( calculationArray[calcIndex] === "+" || calculationArray[calcIndex] === "-"){
                var pemCalc = calculate(calculationArray[calcIndex-1], calculationArray[calcIndex+1], calculationArray[calcIndex]);
                // var stringNumber = pemCalc.toString();
                calculationArray.splice(calcIndex-1, 3, pemCalc);
                console.log(calculationArray);
                --calcIndex;

            }
        }

    }
    fixedNum = calculationArray[0].toFixed(5);
    stringNumberToPush = calculationArray[0];
    calculationResult = calculationArray[0];
    displayArray.push(calculationArray[0]);

    calculationArray = [];
    updateDisplay();


}

function calculate (num1, num2, operator) {
    var number1 = parseFloat(num1);
    var number2 = parseFloat(num2);
    var result = null;

    switch (operator) {
        case "+":
            result = number1 + number2;
            break;
        case "-":
            result = number1 - number2;
            break;
        case "*":
            result = number1 * number2;
            break;
        case "/":
            result = number1 / number2;
            break;
    }
    return result;
}
