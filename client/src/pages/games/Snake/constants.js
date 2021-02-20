const STAGE_SIZE = [650, 650];
const SNAKE_START = [
  [8, 13],
  [8, 14]
];
const APPLE_START = [8, 7];
const SCALE = 40;
const SPEED = 100;
const DIRECTIONS = {
  38: [0, -1], // gora
  40: [0, 1], // dol
  37: [-1, 0], // lewo
  39: [1, 0] // prawo
};

export {
  STAGE_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS
};