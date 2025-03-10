const board = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");

const size = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 1, dy = 0;
let score = 0;

function draw() {
    board.innerHTML = "";
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            for (let i = 0; i < snake.length; i++) {
                if (snake[i].x === x && snake[i].y === y) {
                    cell.classList.add("snake");
                    break;
                }
            }

            if (food.x === x && food.y === y) cell.classList.add("food");

            board.appendChild(cell);
        }
    }
}

function move() {
    let head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        food = { x: Math.floor(Math.random() * size), y: Math.floor(Math.random() * size) };
    } else {
        snake.pop();
    }

    if (checkCollision(head)) {
        alert("Game over! Score: " + score);
        location.reload();
    }

    draw();
}

function checkCollision(head) {
    if (head.x < 0 || head.x >= size || head.y < 0 || head.y >= size) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && dy === 0) [dx, dy] = [0, -1];
    if (e.key === "ArrowDown" && dy === 0) [dx, dy] = [0, 1];
    if (e.key === "ArrowLeft" && dx === 0) [dx, dy] = [-1, 0];
    if (e.key === "ArrowRight" && dx === 0) [dx, dy] = [1, 0];
});

setInterval(move, 150);
draw();
