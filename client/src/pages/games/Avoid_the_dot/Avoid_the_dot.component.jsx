import React, { useState, useCallback, useEffect, useRef } from "react";
import "./Avoid_the_dot.styles.css";
import { SPEED_STEP, SPAWN_INTERVAL } from "./constants";
import { createBall, removeBall } from "./utils";
import Display from "../../../components/avoid_the_dot-components/Display";
import StartButton from "../../../components/avoid_the_dot-components/StartButton";
import Player from "../../../components/avoid_the_dot-components/player.component";
import Ball from "../../../components/avoid_the_dot-components/ball.component";

const AvoidTheDot = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [balls, setBalls] = useState([]);
  const [gameOver, setGameOver] = useState(null);
  const [collision, setCollision] = useState(false);
  const requestRef = useRef();
  const intervalRef = useRef();
  const zoneRef = useRef();
  const playerRef = useRef();
  const ballRef = useRef();
  const enemyRef = useRef();

  //collision match\
  const [horizontalMatch, setHorizontalMatch] = useState(false);
  const [verticalMatch, setVerticalMatch] = useState(false);

  const startGame = () => {
    setSpeed(5);
    setScore(0);
    setBalls([]);
    setGameOver(false);
    setIsRunning(true);
  };

  // const checkCollision =() =>{
  //   const player = playerRef.current.getBoundingClientRect();
  //   if(ballRef.current){
  //   const ball = ballRef.current.getBoundingClientRect();

  //   var playerPos = { x: player.x, y: player.y, width: player.width, height: player.height };
  //   var ballPos = { x: ball.x, y: ball.y, width: ball.width, height: ball.height };

  //   if (
  //     playerPos.x < ballPos.x + ballPos.width &&
  //     playerPos.x + playerPos.width > ballPos.x &&
  //     playerPos.y < ballPos.y + ballPos.height &&
  //     playerPos.y + playerPos.height > ballPos.y
  //   ) {
  //      setCollision(true);
  //   }
  //   }
  //   return collision;
  // };

  // const checkCollision = () => {
  //   const player = playerRef.current.getBoundingClientRect();
  //   if(ballRef.current){
  //   const ball = ballRef.current.getBoundingClientRect();

  //   var playerPos = { x: player.x, y: player.y, width: player.width, height: player.height };
  //   var ballPos = { x: ball.x, y: ball.y, width: ball.width, height: ball.height };

  //   if (
  //     playerPos.x < ballPos.x + ballPos.width &&
  //     playerPos.x + playerPos.width > ballPos.x &&
  //     playerPos.y < ballPos.y + ballPos.height &&
  //     playerPos.y + playerPos.height > ballPos.y
  //   ) {
  //     return true;
  //   }
  //   }
  //   return false;
  // };

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

    return () => stop();
  }, [isRunning, advanceStep, spawnBall]);

  return (
    <div className="d-flex justify-content-center p-2">
      <div className="zone-container" ref={zoneRef}>
        {balls.map((ball, index) => {
          const x = ((zoneRef.current.offsetWidth - ball.size) * ball.x) / 100;
          return (
            <Ball
              setEnemyRef={enemyRef}
              setRef={ballRef}
              key={`dot-${index}`}
              {...ball}
              x={x}
              index={index}
            />
          );
        })}

        <Player setRef={playerRef} />
      </div>
      <aside className="avoid_displays">
        {gameOver ? (
          <Display gameOver={gameOver} text="Game Over" game="avoid" />
        ) : (
          <div>
            <Display text={`Score: ${score}`} game="avoid" />
            <Display text={`High score: `} game="avoid" />
          </div>
        )}
        <StartButton callback={startGame} />
      </aside>
    </div>
  );
};

export default AvoidTheDot;
