const CANVAS_BACKGROUND_COLOR = "#669900";
const CANVAS_BORDER_COLOR = "#223300";

const SNAKE_COLOR = "yellow";
const SNAKE_BORDER_COLOR = "black";

const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

let snake = [
  { x: 330, y: 250 },
  { x: 310, y: 250 },
  { x: 290, y: 250 },
  { x: 270, y: 250 },
  { x: 250, y: 250 }
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
  snake.pop();
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

function main() {
  setTimeout(function onTick() {
    refreshCanvas();
    advanceSnake();
    drawSnake();

    main();
  }, 250);
}

console.log("kuku");

document.addEventListener("keydown", changeDirection);
