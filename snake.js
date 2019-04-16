const CANVAS_BACKGROUND_COLOR = "#669900";
const CANVAS_BORDER_COLOR = "#223300";

const SNAKE_COLOR = "yellow";
const SNAKE_BORDER_COLOR = "black";

const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

let snake = [
  { x: 340, y: 260 },
  { x: 320, y: 260 },
  { x: 300, y: 260 },
  { x: 280, y: 260 },
  { x: 260, y: 260 }
];

let dx = 20;
let dy = 0;

context.fillStyle = CANVAS_BACKGROUND_COLOR;
context.strokeStyle = CANVAS_BORDER_COLOR;
context.fillRect(0, 0, canvas.width, canvas.height);
context.strokeRect(0, 0, canvas.width, canvas.height);

drawSnake();

function advanceSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  snake.unshift(head);

  const ateFood = snake[0].x === foodX && snake[0].y === foodY;
  ateFood ? createFood() : snake.pop();
}

function refreshCanvas() {
  context.fillStyle = "#669900";
  context.strokeStyle = "#223300";

  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) {
  context.fillStyle = SNAKE_COLOR;
  context.strokeStyle = SNAKE_BORDER_COLOR;
  context.fillRect(snakePart.x, snakePart.y, 20, 20);
  context.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

function changeDirection(event) {
  const left_key = 37;
  const up_key = 38;
  const right_key = 39;
  const down_key = 40;

  const keyPressed = event.keyCode;
  const goLeft = dx === -20;
  const goUp = dy === -20;
  const goRight = dx === 20;
  const goDown = dy === 20;

  if (keyPressed === left_key && !goRight) {
    dx = -20;
    dy = 0;
  }

  if (keyPressed === up_key && !goDown) {
    dx = 0;
    dy = -20;
  }

  if (keyPressed === right_key && !goLeft) {
    dx = 20;
    dy = 0;
  }

  if (keyPressed === down_key && !goUp) {
    dx = 0;
    dy = 20;
  }
}

main();
createFood();

function main() {
  setTimeout(function onTick() {
    refreshCanvas();
    drawFood();
    advanceSnake();
    drawSnake();

    main();
  }, 500);
}

document.addEventListener("keydown", changeDirection);

function randomRect(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 20) * 20;
}

function createFood() {
  foodX = randomRect(0, canvas.width - 20);
  foodY = randomRect(0, canvas.height - 20);

  snake.forEach(function isFoodOnSnake(part) {
    const foodOnSnake = part.x == foodX && part.y == foodY;
    if (foodOnSnake) {
      createFood();
    }
  });
}

function drawFood() {
  context.fillStyle = "red";
  context.strokeStyle = "black";
  context.fillRect(foodX, foodY, 20, 20);
  context.strokeRect(foodX, foodY, 20, 20);
}
