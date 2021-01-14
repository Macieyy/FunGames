import { useState, useEffect, useCallback, useContext } from "react";
import HighScoreService from "../services/HighScoresService";
import {AuthContext} from "../context/AuthContext"

export const useGameStatus = (rowsCleared) => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);
  const [highScore, setHighScore] = useState({ highScore: 0});
  const [highScores, setHighScores] = useState([]);
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  const linePoints = [40, 100, 300, 1200];

  const calcScore = useCallback(() => {
    //Sprzwdzenie czy gracz posiada jakiś wynik
    if (rowsCleared > 0) {
      setScore((prev) => prev + linePoints[rowsCleared - 1] * (level + 1));
      setRows((prev) => prev + rowsCleared);
    }
  }, [level, linePoints, rowsCleared]);

  const updateScoree200 = () => {
    setScore(200);
  };
  const updateScoree400 = () => {
    setScore(500);
  };
  const updateHighScore = () => {
    if (score > highScore.highScore) {
      const highScoreToSend = {
        id: highScore._id,
        highScore: score
      };
      HighScoreService.putHighscore(highScoreToSend).then((data) => {
        const { message } = data;
        if (!message.msgError) {
          HighScoreService.getHighscores().then((getData) => {
            const newValues = {
              highScore: getData.highScores[0].highScore,
              id: getData.highScores[0]._id,
            };
            setHighScore(newValues);
            setMessage(message);
          });
        } else if (message.msgBody === "Unauthorized") {
          setMessage(message);
          authContext.setUser({ username: ""});
          authContext.setIsAuthenticated(false);
        } else {
          setMessage(message);
        }
      });
    }
  };

  useEffect(() => {
    HighScoreService.getHighscores().then((data) => {
      setHighScore(data.highScores[0]);
    });
    calcScore();
  }, [calcScore, rowsCleared, score]);
  return [
    score,
    setScore,
    rows,
    setRows,
    level,
    setLevel,
    highScore,
    updateHighScore,
    updateScoree200,
    updateScoree400
  ];
};
