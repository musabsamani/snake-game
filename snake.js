import { getInputDirection } from "./input.js";
import { GRID_SIZE } from "./grid.js";

export var snakeSpeed = 5;
var snakeAccelerateStep = 3,
  snakeAccelerateRate = 1;
const snakeBody = [
  { x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) },
];
let newSegment = 0;
// function
export function update() {
  addSegments();
  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}
export function draw(gameBoard) {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
}
export function expandSnake(expansionRate) {
  newSegment += expansionRate;
  if (snakeBody.length % snakeAccelerateStep === 0) {
    snakeSpeed += snakeAccelerateRate;
  }
}
export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) {
      return false;
    }
    return equalPositions(segment, position);
  });
}
export function getSnakeHead() {
  return snakeBody[0];
}
export function snakeIntersection() {
  return onSnake(getSnakeHead(), { ignoreHead: true });
}
function equalPositions(position1, position2) {
  return position1.x === position2.x && position1.y === position2.y;
}
function addSegments() {
  for (let i = 0; i < newSegment; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegment = 0;
}
