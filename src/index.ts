let currentInput: string = '0';
let previousInput: string = '';
let operation: string | null = null;
let resetInput: boolean = false;
const display = document.getElementById('display') as HTMLInputElement | null;

function updateDisplay(): void {
  if (display) {
    display.value = currentInput;
  }
}

function addToDisplay(value: string): void {
  if (currentInput === '0' || resetInput) {
    currentInput = value;
    resetInput = false;
  } else {
    currentInput += value;
  }
  updateDisplay();
}

function addOperator(op: string): void {
  if (operation !== null) {
    calculate();
  }
  previousInput = currentInput;
  operation = op;
  resetInput = true;

  // Update operator button styling
  document.querySelectorAll('.operator').forEach(btn => {
    btn.classList.remove('selected');
  });
  const target = event?.target as HTMLElement | null; // Potential issue: event is not defined.
  if (target && target.classList) {
    target.classList.add('selected');
  }
}

function calculate(): void {
  let computation: number | undefined;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) {
    return;
  }

  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      computation = prev / current;
      break;
    default:
      return;
  }

  if (computation !== undefined) {
    currentInput = computation.toString();
    operation = null;
    resetInput = true;
    updateDisplay();

    // Remove operator selection
    document.querySelectorAll('.operator').forEach(btn => {
      btn.classList.remove('selected');
    });
  }
}

function clearDisplay(): void {
  currentInput = '0';
  previousInput = '';
  operation = null;
  updateDisplay();

  // Remove operator selection
  document.querySelectorAll('.operator').forEach(btn => {
    btn.classList.remove('selected');
  });
}

function toggleSign(): void {
  currentInput = (parseFloat(currentInput) * -1).toString();
  updateDisplay();
}

function percentage(): void {
  currentInput = (parseFloat(currentInput) / 100).toString();
  updateDisplay();
}
function toggleDarkMode(): void {
  const body = document.body;
  body.classList.toggle("dark-mode");
  console.log("Dark mode toggled");
}

// Event listener for the dark mode switch
if (checkbox) {
  checkbox.addEventListener("change", toggleDarkMode);
}
// Initialize display
updateDisplay();