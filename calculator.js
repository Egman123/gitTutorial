const signs = [
  { className: "operator", text: "+", value: "+" },
  { className: "operator", text: "-", value: "-" },
  { className: "operator", text: "&times;", value: "*" },
  { className: "operator", text: "&divide;", value: "/" }
];
const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const otherBtns = [
  { className: "decimal", text: ".", value: "." },
  { className: "all-clear", text: "C", value: "all-clear" },
  { className: "equal-sign", text: "=", value: "=" }
];

const calculator = {
  firstOperand: "0",
  operator: null,
  secondOperand: null
};

const display = document.querySelector(".calculator-screen");
const div = document.querySelector(".calculator-keys");
div.addEventListener("click", handleBtnClick);

signs.forEach(sign => {
  let btn = document.createElement("BUTTON");
  btn.classList.add(sign.className);
  btn.value = sign.value;
  btn.innerHTML = sign.text;
  div.appendChild(btn);
});

numbers.forEach(number => {
  let btn = document.createElement("BUTTON");
  btn.value = number;
  btn.innerHTML = number;
  div.appendChild(btn);
});

otherBtns.forEach(otherBtn => {
  let btn = document.createElement("BUTTON");
  btn.classList.add(otherBtn.className);
  btn.value = otherBtn.value;
  btn.innerHTML = otherBtn.text;
  div.appendChild(btn);
});

function updateDisplay(value) {
  display.value = value;
}

function handleBtnClick(event) {
  // console.log(typeof event.target.value)
  let currentValue = event.target.value;
  switch (event.target.value) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      if (calculator.firstOperand === "0" && calculator.operator === null) {
        calculator.firstOperand = currentValue;
        updateDisplay(calculator.firstOperand)
      }
      else if (calculator.operator !== null) {
        let result;
        if (calculator.secondOperand === null) {
          calculator.secondOperand = currentValue;
          result = calculator.firstOperand.concat(calculator.operator).concat(calculator.secondOperand)
          updateDisplay(result);
        }
        else {
          calculator.secondOperand = calculator.secondOperand.concat(currentValue);
          result = calculator.firstOperand.concat(calculator.operator).concat(calculator.secondOperand);
          updateDisplay(result);
        }
        
      }
      else {
        calculator.firstOperand = calculator.firstOperand.concat(currentValue);
        updateDisplay(calculator.firstOperand)
      }
    break;
    case "+":
    case "-":
    case "*":
    case "/":
      calculator.operator = currentValue;
      updateDisplay(calculator.firstOperand.concat(calculator.operator));
    break;
    case "=":
      if (calculator.secondOperand !== null) {
        let calcResult = calcExpression(calculator.firstOperand, calculator.operator, calculator.secondOperand);
        updateDisplay(calcResult);
      }
    break;
    case "all-clear":
      calculator.firstOperand = "0";
      calculator.operator = null;
      calculator.secondOperand = null;
      updateDisplay(calculator.firstOperand);
    break;
  }

}

function calcExpression(operand1, operator, operand2) {
  switch (operator) {
    case "+":
      return parseInt(operand1) + parseInt(operand2);
    case "-":
      return parseInt(operand1) - parseInt(operand2);
    case "*":
      return parseInt(operand1) * parseInt(operand2);
    case "/":
      return parseInt(operand1) / parseInt(operand2);
  }
}
