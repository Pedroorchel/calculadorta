// (O código JavaScript para a funcionalidade da calculadora deve ser o mesmo do exemplo anterior.)

const resultInput = document.getElementById('result');
const buttons = document.querySelectorAll('.buttons-grid button');

let currentInput = '';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

// Função principal de cálculo
function calculate(first, second, op) {
    first = parseFloat(first);
    second = parseFloat(second);

    if (isNaN(first) || isNaN(second)) return second;

    switch (op) {
        case '+': return first + second;
        case '-': return first - second;
        case '*': return first * second;
        case '/': return first / second;
        default: return second;
    }
}

// Função para resetar/limpar a calculadora
function resetCalculator() {
    currentInput = '0';
    operator = null;
    firstOperand = null;
    waitingForSecondOperand = false;
}

// Função para atualizar a tela
function updateDisplay() {
    resultInput.value = currentInput;
}

// Inicializa a calculadora
resetCalculator();
updateDisplay();

// Gerencia a entrada de números e operadores
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (action === 'clear') {
            resetCalculator();
        } else if (action === 'calculate') {
            handleOperator(operator); // Calcula o resultado
            operator = null;
            waitingForSecondOperand = false;
        } else if (value && !isNaN(value) || value === '.' || value === '00') {
            // Se for número ou ponto
            if (waitingForSecondOperand) {
                currentInput = value;
                waitingForSecondOperand = false;
            } else {
                if (currentInput === '0' && value !== '.') {
                    currentInput = value;
                } else if (value === '.' && currentInput.includes('.')) {
                    return; // Não permite múltiplos pontos
                } else if (value === '00' && currentInput === '0') {
                    return; // 00 depois de 0 não faz sentido
                } else if (value === '00') {
                    currentInput += '00';
                }
                else {
                    currentInput += value;
                }
            }
        } else if (value && isNaN(value)) {
            // Se for operador (+, -, *, /)
            handleOperator(value);
        }

        updateDisplay();
    });
});

// Lógica para operações
function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        currentInput = `${parseFloat(result.toFixed(7))}`; // Evita erros de ponto flutuante
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}