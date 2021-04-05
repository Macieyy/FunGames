import React, { useState, useRef, useEffect } from "react";
import { useInterval } from "../../../hooks/useInterval";
import { useHighScores } from "../../../hooks/useHighScores";
import "./Snake.styles.css";
import Display from "../../../components/snake-components/Display";
import StartButton from "../../../components/snake-components/StartButton";
import {
  STAGE_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
} from "./constants";

const Snake = () => {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScores, updateHighScore] = useHighScores();

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
    updateHighScore("snake", score);
  };

  const createApple = () =>
    apple.map((_a, i) => Math.floor(Math.random() * (STAGE_SIZE[i] / SCALE)));

  const moveSnake = ({ keyCode }) => {
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);
  };
  //sprawdzenie kolizji ze sciana lub z samym soba
  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] * SCALE >= STAGE_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= STAGE_SIZE[1] ||
      piece[1] < 0
    )
      return true;

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
  };

  const checkAppleCollision = (newSnake) => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      setScore(score + 10);
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  const startGame = () => {
    setScore(0);
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setGameOver(false);
  };

  useEffect(() => {
    if (highScores.length > 0) {
      setHighScore(highScores[1].highScore);
    }
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "blue";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "red";
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver, highScores]);

  useInterval(() => gameLoop(), speed);

  return (
    <div
      role="button"
      className="d-flex justify-content-center snake_game_container"
      tabIndex="0"
      onKeyDown={(e) => moveSnake(e)}
    >
      <canvas
        id="snake_stage"
        ref={canvasRef}
        width={`${STAGE_SIZE[0]}px`}
        height={`${STAGE_SIZE[1]}px`}
      />
      <aside className="snake_displays">
        {gameOver ? (
          <Display gameOver={gameOver} text="Game Over" />
        ) : (
          <div>
            <Display text={`Score: ${score}`} />
            <Display text={`High score: ${highScore}`} />
          </div>
        )}
        <StartButton callback={startGame} game="snake" />
      </aside>
      <a
          style={{ position: "fixed", bottom: "0", right: "0", color: "white" }}
          href="https://www.freepik.com/vectors/star"
        >
          Star vector created by upklyak - www.freepik.com
        </a>
    </div>
  );
};

export default Snake;
