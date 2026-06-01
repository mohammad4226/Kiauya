const display = document.getElementById('display');

// Append number to display
function appendNumber(num) {
    // Prevent multiple decimal points
    if (num === '.' && display.value.includes('.')) {
        return;
    }
    display.value += num;
}

// Append operator to display
function appendOperator(operator) {
    // Prevent operator at the beginning
    if (display.value === '') {
        return;
    }
    
    // Prevent multiple consecutive operators
    const lastChar = display.value[display.value.length - 1];
    if (['+', '-', '*', '/', '%'].includes(lastChar)) {
        return;
    }
    
    display.value += operator;
}

// Clear display
function clearDisplay() {
    display.value = '';
}

// Delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate result
function calculate() {
    try {
        // Replace symbols with standard operators
        let expression = display.value
            .replace(/÷/g, '/')
            .replace(/×/g, '*')
            .replace(/−/g, '-');
        
        // Evaluate the expression
        const result = eval(expression);
        
        // Handle division by zero
        if (!isFinite(result)) {
            display.value = 'Error';
            return;
        }
        
        // Display result (rounded to 10 decimal places to avoid floating point errors)
        display.value = Math.round(result * 10000000000) / 10000000000;
    } catch (error) {
        display.value = 'Error';
    }
}

// Allow keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
