const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
let direction = { x: 0, y: 0 };
let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    switch (event.keyCode) {
        case 37: // left arrow
            if (direction.x === 0) {
                direction = { x: -1, y: 0 };
            }
            break;
        case 38: // up arrow
            if (direction.y === 0) {
                direction = { x: 0, y: -1 };
            }
            break;
        case 39: // right arrow
            if (direction.x === 0) {
                direction = { x: 1, y: 0 };
            }
            break;
        case 40: // down arrow
            if (direction.y === 0) {
                direction = { x: 0, y: 1 };
            }
            break;
    }
}

function updateGame() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check for collision with walls or self
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount || snakeCollision(head)) {
        resetGame();
        return;
    }

    snake.unshift(head);

    // Check if snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById("score").textContent = `Score: ${score}`;
        food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
    } else {
        snake.pop();
    }

    // Draw everything
    drawGame();
}

function snakeCollision(head) {
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    document.getElementById("score").textContent = `Score: ${score}`;
}
function setDirection(dir) {
  switch (dir) {
    case "left":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "up":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "right":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
    case "down":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
  }
}

setInterval(updateGame, 150);
