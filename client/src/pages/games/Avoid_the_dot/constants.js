import RedBall from "../../../resources/sprites/avoid_the_dot/redBall.png"
import GreenBall from "../../../resources/sprites/avoid_the_dot/greenBall.png"
import BlueBall from "../../../resources/sprites/avoid_the_dot/ball.png"
// color for dots to pick from list
export const SPRITES = [RedBall, GreenBall, BlueBall];
// wielkosc kulek
export const SIZES = [10, 15, 20, 25, 30, 35, 40, 45];
// szybkosc px/sekunda
export const SPEED_STEP = 10;
// Max value of points - each dot will cost MAX - size points
export const MAX_POINTS = 50;

export const SPAWN_INTERVAL = 1000;