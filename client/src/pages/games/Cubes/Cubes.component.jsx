import React, { useState, useEffect } from "react";

import { createStage, checkCollision } from "./utils";

//Styled Componets

import {
  StyledCubesWrapper,
  StyledCubes,
} from "../../../components/cubes-components/styles/StyledCubes";

//Custom hooks
import { useInterval } from "../../../hooks/useInterval";
import { usePlayer } from "../../../hooks/usePlayer";
import { useStage } from "../../../hooks/useStage";
import { useGameStatus } from "../../../hooks/useGameStatus";
import { useHighScores } from "../../../hooks/useHighScores";

//Components
import Stage from "../../../components/cubes-components/Stage";
import Display from "../../../components/cubes-components/Display";
import StartButton from "../../../components/cubes-components/StartButton";

const Cubes = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );
  const [highScores, updateHighScore] = useHighScores();

  //console.log("re-render");

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 }))
      updatePlayerPos({ x: dir, y: 0 });
  };

  const startGame = () => {
    //Resetowanie
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    //zwiekszenie poziomu gdy gracz połączył 10 rzędów
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 }))
      updatePlayerPos({ x: 0, y: 1, collided: false });
    else {
      //koniec gry
      if (player.pos.y < 1) {
        console.log("GAME OVER");
        setGameOver(true);
        setDropTime(null);
        updateHighScore("cubes", score);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        console.log("interval on");
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    console.log("interval off");
    setDropTime(null);
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };
  useEffect(() => {
    if (highScores.length > 0) {
      setHighScore(highScores[0].highScore);
    }
  }, [highScores]);
  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <div>
      <StyledCubesWrapper
        role="button"
        tabIndex="0"
        onKeyDown={(e) => move(e)}
        onKeyUp={keyUp}
      >
        <StyledCubes>
          <Stage stage={stage} />
          <aside>
            {gameOver ? (
              <Display gameOver={gameOver} text="Game Over" game="cubes" />
            ) : (
              <div>
                <Display text={`Score: ${score}`} game="cubes" />
                <Display text={`Rows: ${rows}`} game="cubes" />
                <Display text={`Level: ${level}`} game="cubes" />
                <Display text={`High score: ${highScore}`} game="cubes" />
              </div>
            )}
            <StartButton callback={startGame} />
          </aside>
        </StyledCubes>
      </StyledCubesWrapper>
      <a
        href="https://www.freepik.com/vectors/background"
        style={{ position: "fixed", bottom: "0", right: "0", color: "white" }}
      >
        Background vector created by pikisuperstar - www.freepik.com
      </a>
    </div>
  );
};

export default Cubes;
