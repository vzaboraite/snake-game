const CANVAS_BACKGROUND_COLOR = "#669900";
const CANVAS_BORDER_COLOR = "##223300";

const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

context.fillStyle = CANVAS_BACKGROUND_COLOR;
context.strokeStyle = CANVAS_BORDER_COLOR;
context.fillRect(0, 0, canvas.width, canvas.height);
context.strokeRect(0, 0, canvas.width, canvas.height);