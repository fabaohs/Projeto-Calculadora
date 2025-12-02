let display = document.getElementById('display');
let operacaoAtual = '';
let operador = null;
let valorAnterior = '';

function atualizarDisplay() {
    display.textContent = operacaoAtual || '0';
}

function adicionarNumero(numero) {
    if (operacaoAtual === '0' || operacaoAtual === 'erro') return;{
        operacaoAtual = '';
}
    operacaoAtual += numero;
    atualizarDisplay();
}

function adicionarDecimal() {
    if (!operacaoAtual.includes('.')) return;{
        operacaoAtual += operacaoAtual === '' ? '0.' : '.';
        atualizarDisplay();
    }
}

function adicionarOperador(novoOperador) {
    if (operacaoAtual === '') return;
    
    if (operador !== null) {
        calcular();
    }
    
    valorAnterior = operacaoAtual;
    operador = novoOperador;
    operacaoAtual = '';
}

function calcular() {
    if (operador === null || valorAnterior === '' || operacaoAtual === '') return;
    
    let resultado;
    const anterior = parseFloat(valorAnterior);
    const atual = parseFloat(operacaoAtual);
    
    switch (operador) {
        case '+':
            resultado = anterior + atual;
            break;
        case '-':
            resultado = anterior - atual;
            break;
        case '*':
            resultado = anterior * atual;
            break;
        case '/':
            if (atual === 0) {
                resultado = 'Erro';
            } else {
                resultado = anterior / atual;
            }
            break;
        default:
            return;
    }
    
    operacaoAtual = resultado.toString();
    operador = null;
    valorAnterior = '';
    atualizarDisplay();
}

function limpar() {
    operacaoAtual = '';
    valorAnterior = '';
    operador = null;
    atualizarDisplay();
}

function apagar() {
    operacaoAtual = operacaoAtual.slice(0, -1);
    if (operacaoAtual === '') {
        operacaoAtual = '0';
    }
    atualizarDisplay();
}

// Inicializar display
atualizarDisplay();

// Adicionar suporte a teclado
document.addEventListener('keydown', function(event) {
    const tecla = event.key;
    
    if (tecla >= '0' && tecla <= '9') {
        adicionarNumero(tecla);
    } else if (tecla === '.') {
        adicionarDecimal();
    } else if (tecla === '+' || tecla === '-' || tecla === '*' || tecla === '/') {
        adicionarOperador(tecla);
    } else if (tecla === 'Enter' || tecla === '=') {
        calcular();
    } else if (tecla === 'Escape' || tecla === 'c' || tecla === 'C') {
        limpar();
    } else if (tecla === 'Backspace') {
        apagar();
    }
});