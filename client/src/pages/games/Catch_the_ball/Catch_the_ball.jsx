import React, { useState, useCallback, useEffect, useRef } from "react";
import "./Catch_the_ball.styles.css";
import { SPEED_STEP, SPAWN_INTERVAL } from "./constants";
import { createBall, removeBall, calculatePoints } from "./utils";
import { useInterval } from "../../../hooks/useInterval";
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
  const endGame = useCallback(() => {
    setIsRunning(false);
    setSpeed(null);
    setGameOver(true);
    updateHighScore("catch the ball", score);
  }, [score, updateHighScore]);

  // const checkCollision = () => {
  //   var player = playerRef.current.getBoundingClientRect();
  //   balls.map((ball, index) => {
  //     console.log(ball);
  //     var ballRect = document
  //       .getElementById("ball" + index)
  //       .getBoundingClientRect();
  //     if (
  //       player.top + player.height < ballRect.top ||
  //       player.top > ballRect.top + ballRect.height ||
  //       player.left + player.width < ballRect.left ||
  //       player.left > ballRect.left + ballRect.width
  //     ) {
  //       if (ball.sprite.includes("redBall")) {
  //         endGame();
  //         return;
  //       } else {
  //         setScore(score + calculatePoints(balls[index]));
  //         setBalls(removeBall(balls, index));
  //       }
  //       return;
  //     }
  //   });
  //   return false;
  // };

  const advanceStep = useCallback(() => {
    setBalls((oldBalls) => {
      const newBalls = [];
      for (let ball of oldBalls) {
        // console.log(
        //   document
        //     .getElementById("ball" + oldBalls.indexOf(ball))
        //     .getBoundingClientRect()
        // );
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
      requestRef.current && cancelAnimationFrame(requestRef.current);
    };

    if (isRunning) {
      requestRef.current = requestAnimationFrame(advanceStep);
      var player = playerRef.current.getBoundingClientRect();
      if (ballsLength > 0) {
        for (let ball of balls) {
          var ballRect = document
            .getElementById("ball" + balls.indexOf(ball))
            .getBoundingClientRect();
          if (
            !(player.top + player.height < ballRect.top ||
            player.top > ballRect.top + ballRect.height ||
            player.left + player.width < ballRect.left ||
            player.left > ballRect.left + ballRect.width)
          ) {
            if (ball.sprite.includes("redBall")) {
              endGame();
            } else {
              console.log("collided")
              setScore(score + calculatePoints(balls[balls.indexOf(ball)]));
              setBalls(removeBall(balls, balls.indexOf(ball)));
            }

          }
        };
      }
    } else {
      stop();
    }
    return () => stop();
  }, [isRunning, advanceStep, ballsLength, highScores, score, highScore, balls, endGame]);

  useInterval(() => spawnBall(), isRunning ? SPAWN_INTERVAL : null);

  return (
    <div className="d-flex justify-content-center p-2">
      <div className="zone-container" ref={zoneRef}>
        {balls.map((ball, index) => {
          const x = ((zoneRef.current.offsetWidth - ball.size) * ball.x) / 100;
          return <Ball key={`dot-${index}`} {...ball} x={x} index={index} />;
        })}

        <Player setRef={playerRef} isRunning={isRunning} />
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
      <a
        style={{ position: "fixed", bottom: "0", right: "0", color: "white" }}
        href="https://www.freepik.com/vectors/star"
      >
        Star vector created by upklyak - www.freepik.com
      </a>
    </div>
  );
};

export default CatchTheBall;
