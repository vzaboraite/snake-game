const CANVAS_BACKGROUND_COLOR = "#2A385B";
const CANVAS_BORDER_COLOR = "#9E9CC2";

const SNAKE_COLOR = "#FAF2EA";
const SNAKE_BORDER_COLOR = "#2A385B";

const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const scoreElem = document.getElementById("score");

const directions = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

let previousDirection = directions.RIGHT;
let nextDirection = directions.RIGHT;

let snake = [
  { x: 340, y: 260 },
  { x: 320, y: 260 },
  { x: 300, y: 260 },
  { x: 280, y: 260 },
  { x: 260, y: 260 },
];

let score = 0;

let dx = 20;
let dy = 0;

context.fillStyle = CANVAS_BACKGROUND_COLOR;
context.strokeStyle = CANVAS_BORDER_COLOR;
context.fillRect(0, 0, canvas.width, canvas.height);
context.strokeRect(0, 0, canvas.width, canvas.height);

main();
drawSnake();
createFood();

function advanceSnake() {
  const head = generateNextHead();

  if (head.x > canvas.width - 20) {
    head.x = 0;
  }
  if (head.x < 0) {
    head.x = canvas.width - 20;
  }
  if (head.y > canvas.height - 20) {
    head.y = 0;
  }
  if (head.y < 0) {
    head.y = canvas.height - 20;
  }

  snake.unshift(head);

  const ateFood = snake[0].x === foodX && snake[0].y === foodY;
  if (ateFood) {
    score += 20;
    scoreElem.innerText = score;
    createFood();
  } else {
    snake.pop();
  }
}

function generateNextHead() {
  switch (nextDirection) {
    case directions.LEFT:
      previousDirection = directions.LEFT;
      return { x: snake[0].x - 20, y: snake[0].y };
    case directions.UP:
      previousDirection = directions.UP;
      return { x: snake[0].x, y: snake[0].y - 20 };
    case directions.RIGHT:
      previousDirection = directions.RIGHT;
      return { x: snake[0].x + 20, y: snake[0].y };
    case directions.DOWN:
      previousDirection = directions.DOWN;
      return { x: snake[0].x, y: snake[0].y + 20 };
  }
}

function refreshCanvas() {
  context.fillStyle = "#2A385B";
  context.strokeStyle = "#9E9CC2";

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
  const keyPressed = event.keyCode;

  if (keyPressed === directions.LEFT && previousDirection != directions.RIGHT) {
    nextDirection = directions.LEFT;
  }

  if (keyPressed === directions.UP && previousDirection != directions.DOWN) {
    nextDirection = directions.UP;
  }

  if (keyPressed === directions.RIGHT && previousDirection != directions.LEFT) {
    nextDirection = directions.RIGHT;
  }

  if (keyPressed === directions.DOWN && previousDirection != directions.UP) {
    nextDirection = directions.DOWN;
  }
}

function main() {
  setTimeout(function onTick() {
    refreshCanvas();
    drawFood();
    advanceSnake();
    drawSnake();
    if (gameEnd()) return;

    main();
  }, 250);
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
  context.fillStyle = "#FDF0F2";
  context.strokeStyle = "FDF0F2";
  context.fillRect(foodX, foodY, 20, 20);
  context.strokeRect(foodX, foodY, 20, 20);
}

function gameEnd() {
  for (let i = 4; i < snake.length; i++) {
    const didHitSelf = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    if (didHitSelf) return true;
  }
}
