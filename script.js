const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const acButton = document.querySelector('[data-allClear]');
const deleteButton = document.querySelector('[data-delete]');
const equalButton = document.querySelector('[data-equal]');
const currentDisplay = document.querySelector('[data-current]');
const previousDisplay = document.querySelector('[data-previous]');

// Get the audio elements
const equalSound = document.getElementById('equalSound');
const operationSound = document.getElementById('operationSound');

class Calculator {
  constructor(currentDisplay, previousDisplay) {
    this.currentDisplay = currentDisplay;
    this.previousDisplay = previousDisplay;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    this.updateDisplay();
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    this.updateDisplay();
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand += number.toString();
    this.updateDisplay();
  }

  chooseOperator(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    this.updateDisplay();
    operationSound.play(); // Play operation sound
  }

  compute() {
    // Overrides the computation to always display "I miss you and I love you"
    this.currentOperand = "Hi erin, I miss you, Kumusta ka? Could we talk again and maybe go out soon? I'd love to catch up and spend some time together.Looking forward to it.";
    this.operation = undefined;
    this.previousOperand = '';
    this.updateDisplay();
    equalSound.play(); // Play the equal sound
  }

  updateDisplay() {
    this.currentDisplay.innerText = this.currentOperand;
    this.previousDisplay.innerText = this.operation ? `${this.previousOperand} ${this.operation}` : '';
  }
}

const calculator = new Calculator(currentDisplay, previousDisplay);

acButton.addEventListener('click', () => calculator.clear());

equalButton.addEventListener('click', () => calculator.compute());

numberButtons.forEach(button => {
  button.addEventListener('click', event => {
    calculator.appendNumber(button.innerText);
  });
});

operatorButtons.forEach(button => {
  button.addEventListener('click', event => {
    calculator.chooseOperator(button.innerText);
  });
});

deleteButton.addEventListener('click', () => calculator.delete());
