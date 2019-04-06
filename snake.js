const CANVAS_BACKGROUND_COLOR = "#669900";
const CANVAS_BORDER_COLOR = "##223300";

const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

context.fillStyle = CANVAS_BACKGROUND_COLOR;
context.strokeStyle = CANVAS_BORDER_COLOR;
context.fillRect(0, 0, canvas.width, canvas.height);
context.strokeRect(0, 0, canvas.width, canvas.height);

let snake = [
  { x: 250, y: 250 },
  { x: 270, y: 250 },
  { x: 290, y: 250 },
  { x: 310, y: 250 },
  { x: 330, y: 250 }
];

function drawSnakePart(snakePart) {
  context.fillStyle = "yellow";
  context.strokeStyle = "black";
  context.fillRect(snakePart.x, snakePart.y, 20, 20);
  context.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

drawSnake();
