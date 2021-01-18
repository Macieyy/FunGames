import { useState, useEffect, useContext } from "react";
import HighScoreService from "../services/HighScoresService";
import { AuthContext } from "../context/AuthContext";

export const useHighScores = () => {
  const [highScores, setHighScores] = useState([]);
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const updateHighScore = (name, score) => {
    let gameToUpdate = highScores.find((x) => x.gameName === name);
    if (score > gameToUpdate.highScore) {
      const highScoreToSend = {
        id: gameToUpdate._id,
        highScore: score,
      };
      HighScoreService.putHighscore(highScoreToSend).then((data) => {
        const { message } = data;
        if (!message.msgError) {
          HighScoreService.getHighscores().then((getData) => {
            setHighScores(getData.highScores);
          });
        } else if (message.msgBody === "Unauthorized") {
          setMessage(message);
          authContext.setUser({ username: "" });
          authContext.setIsAuthenticated(false);
        } else {
          setMessage(message);
        }
      });
    }
  };

  useEffect(() => {
    HighScoreService.getHighscores().then((data) => {
      setHighScores(data.highScores);
    });
  }, [highScores.length]);
  return [highScores, updateHighScore];
};
