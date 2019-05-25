var calculationArray = [];
var displayArray = [];
var stringNumberToPush = "";
var calculationResult = null;

$(document).ready(initializeApp);
function initializeApp () {
    applyClickHAndlers();
}
function applyClickHAndlers () {
    $("#number-block").on("click", ".number", numberButtonHandler);
    $("#operator-column").on("click", ".operator", operatorButtonHandler);
    $("#equals").on("click", equalsButtonHandler);
}
function equalsButtonHandler (event) {
    calculationArray.push(stringNumberToPush);
    stringNumberToPush = "";
    displayArray = [];
    console.log(calculationArray);
    console.log(event);
}
function operatorButtonHandler (event) {
    var inputtedOperator = $(event.currentTarget).find("p").text();
    displayArray.push(inputtedOperator);
    calculationArray.push(stringNumberToPush);
    calculationArray.push(inputtedOperator);
    console.log(calculationArray);
    updateDisplay();
    stringNumberToPush = "";

    console.log(event);
}
function numberButtonHandler (event) {
    var inputtedNumber = "";
    inputtedNumber = $(event.currentTarget).find("p").text();
    stringNumberToPush += inputtedNumber;
    displayArray.push(inputtedNumber);
    console.log(displayArray);
    console.log(inputtedNumber);
    updateDisplay();
}
function updateDisplay () {
    var displayText = displayArray.join("");
    console.log(displayText);

    $("#display-text").text(displayText);
}
