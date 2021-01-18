import React, {
  useState,
  useCallback,
  useEffect,
  useRef
} from "react";
import "./Catch_the_ball.styles.css";
import { SPEED_STEP, SPAWN_INTERVAL } from "./constants";
import { createBall, removeBall, calculatePoints } from "./utils";
import { useHighScores } from "../../../hooks/useHighScores";
import Display from "../../../components/catch_the_ball-components/Display";
import StartButton from "../../../components/catch_the_ball-components/StartButton";
import Player from "../../../components/catch_the_ball-components/player.component";
import Ball from "../../../components/catch_the_ball-components/ball.component";

const CatchTheBall = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [balls, setBalls] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [highScores, updateHighScore] = useHighScores();
  const [gameOver, setGameOver] = useState(null);
  const requestRef = useRef();
  const intervalRef = useRef();
  const zoneRef = useRef();
  const playerRef = useRef();
  const ballsLength = balls.length;

  const startGame = () => {
    setSpeed(5);
    setScore(0);
    setBalls([]);
    setGameOver(false);
    setIsRunning(true);
  };
  const endGame = () => {
	setIsRunning(false);
    setSpeed(null);
    setGameOver(true);
    updateHighScore("catch the ball", score);
  };

  const checkCollision = useCallback(() => {
    const player = playerRef.current.getBoundingClientRect();
    if (balls.length > 0) {
      balls.map((ball, index) => {
        const ballPosition = document
          .getElementById("ball" + index)
          .getBoundingClientRect();
        var playerPos = {
          x: player.x,
          y: player.y,
          width: player.width,
          height: player.height,
        };
        var ballPos = {
          x: ballPosition.x,
          y: ballPosition.y,
          width: ballPosition.width,
          height: ballPosition.height,
        };
        if (
          playerPos.x < ballPos.x + ballPos.width &&
          playerPos.x + playerPos.width > ballPos.x &&
          playerPos.y < ballPos.y + ballPos.height &&
          playerPos.y + playerPos.height > ballPos.y
        ) {
          if (ball.sprite.includes("redBall")){
			endGame();
			return null;
		  } else{setScore(score + calculatePoints(balls[index]));
		  setBalls(removeBall(balls, index))};
		  return null;
        }
      });
	}
	return null;
}, []);

  const advanceStep = useCallback(() => {
    setBalls((oldBalls) => {
      const newBalls = [];
      for (let ball of oldBalls) {
        const newY = ball.y + (SPEED_STEP * speed) / 60;
        if (newY <= zoneRef.current.offsetHeight - ball.size / 2) {
          newBalls.push({
            ...ball,
            y: newY,
          });
        }
      }
      return newBalls;
    });
    requestRef.current = requestAnimationFrame(advanceStep);
  }, [speed, setBalls]);

  const spawnBall = useCallback(() => {
    setBalls((oldBalls) => [...oldBalls, createBall()]);
  }, [setBalls]);


  useEffect(() => {
	if (highScores.length > 0) {
		setHighScore(highScores[2].highScore);
	  }
    const stop = () => {
      intervalRef.current && clearInterval(intervalRef.current);
      requestRef.current && cancelAnimationFrame(requestRef.current);
    };

    if (isRunning) {
      intervalRef.current = setInterval(spawnBall, SPAWN_INTERVAL);
      requestRef.current = requestAnimationFrame(advanceStep);
    } else {
      stop();
    }
    checkCollision();
    return () => stop();
  }, [isRunning, advanceStep, spawnBall, ballsLength, highScores, checkCollision]);
  
  
  return (
    <div className="d-flex justify-content-center p-2">
      <div className="zone-container" ref={zoneRef}>
        {balls.map((ball, index) => {
          const x = ((zoneRef.current.offsetWidth - ball.size) * ball.x) / 100;
          return <Ball key={`dot-${index}`} {...ball} x={x} index={index} />;
        })}

        <Player setRef={playerRef} isRunning={isRunning}/>
      </div>
      <aside className="catch_ball_displays">
        {gameOver ? (
          <Display gameOver={gameOver} text="Game Over" game="avoid" />
        ) : (
          <div>
            <Display text={`Score: ${score}`} game="avoid" />
            <Display text={`High score: ${highScore}`} game="avoid" />
          </div>
        )}
        <StartButton callback={startGame} />
      </aside>
    </div>
  );
};

export default CatchTheBall;
