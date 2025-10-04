const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const equalsButton = document.getElementById('equals');

// Append value to display
function appendValue(value) {
  display.value += value;
}

// Clear display
function clearDisplay() {
  display.value = '';
}

// Delete last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Parse and evaluate input safely
function calculate() {
  try {
    const result = parseInput(display.value);
    display.value = result;
  } catch (error) {
    display.value = 'Error';
  }
}

// Basic parser to sanitize input
function parseInput(input) {
  if (!/^[0-9+\-*/.() ]+$/.test(input)) {
    throw new Error('Invalid characters');
  }
  return Function(`"use strict"; return (${input})`)();
}

// Event listeners for buttons
buttons.forEach(button => {
  const value = button.dataset.value;
  const action = button.dataset.action;

  if (value) {
    button.addEventListener('click', () => appendValue(value));
  }

  if (action === 'clear') {
    button.addEventListener('click', clearDisplay);
  }

  if (action === 'delete') {
    button.addEventListener('click', deleteLast);
  }
});

// Event listener for equals button
equalsButton.addEventListener('click', calculate);

// Keyboard input handling
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (/[0-9+\-*/.]/.test(key)) {
    appendValue(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'Escape') {
    clearDisplay();
  }
});
