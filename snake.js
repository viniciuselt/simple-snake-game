// Definindo variáveis
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var snakeSize = 10;
var snake;
var appleX, appleY;
var dx = 1;
var dy = 0;
var score = 0;
var interval;

// Evento de clique do botão "start"
document.getElementById('start').addEventListener('click', startGame);

function atualizarScore() {
  document.getElementById("score").textContent = `Score: ${score}`;
}

// Função para iniciar o jogo
function startGame() {
    // Esconde o menu e mostra o canvas
    document.getElementById('menu').style.display = 'none';
    canvas.style.display = 'block';
    
    // Inicia a cobra
    snake = [{x: 5, y: 5}, {x: 4, y: 5}, {x: 3, y: 5}];
    
    // Gera a primeira maçã
    spawnApple();
    
    // Inicia o loop do jogo
    interval = setInterval(gameLoop, 100);
    
}

// Função principal do jogo
function gameLoop() {
    // Move a cobra
    var head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    if (head.x === appleX && head.y === appleY) {
        score++;
        atualizarScore(); // atualiza a pontuação
        spawnApple();
    } else {
        snake.pop();
    }
    
    // Verifica se a cobra colidiu com a parede ou com sua própria cauda
    if (head.x < 0 || head.x >= canvas.width/snakeSize || head.y < 0 || head.y >= canvas.height/snakeSize) {
        gameOver();
    }
    for (var i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
    
// Limpa o canvas e desenha a cobra e a maçã
context.clearRect(0, 0, canvas.width, canvas.height);
context.fillStyle = 'green';
for (var i = 0; i < snake.length; i++) {
    context.fillRect(snake[i].x*snakeSize, snake[i].y*snakeSize, snakeSize, snakeSize);
}
context.fillStyle = 'red';
context.fillRect(appleX*snakeSize, appleY*snakeSize, snakeSize, snakeSize);

// Exibe a pontuação
context.fillStyle = 'black';
context.fillText('Pontuação: ' + score, 10, canvas.height - 10);
}

// Função para gerar uma nova maçã aleatoriamente
function spawnApple() {
    appleX = Math.floor(Math.random() * canvas.width/snakeSize);
    appleY = Math.floor(Math.random() * canvas.height/snakeSize);
}

// Função para encerrar o jogo
function gameOver() {
    clearInterval(interval);
    alert('Game over! Sua pontuação foi: ' + score);
    
    // Volta para o menu
    document.getElementById('menu').style.display = 'block';
    canvas.style.display = 'none';
    score = 0;
}

// Função de movimentação da cobra
function moveSnake(event) {
    switch(event.keyCode) {
        case 37: // Esquerda
            if (dx !== 1) { // Impede que a cobra volte sobre si mesma
                dx = -1;
                dy = 0;
            }
            break;
        case 38: // Cima
            if (dy !== 1) {
                dx = 0;
                dy = -1;
            }
            break;
        case 39: // Direita
            if (dx !== -1) {
                dx = 1;
                dy = 0;
            }
            break;
        case 40: // Baixo
            if (dy !== -1) {
                dx = 0;
                dy = 1;
            }
            break;
    }
}

// Evento de tecla pressionada
document.addEventListener('keydown', moveSnake);
