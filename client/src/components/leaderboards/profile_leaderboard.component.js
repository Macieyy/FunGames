import React from "react";
import Table from "react-bootstrap/Table";
import { useHighScores } from "../../hooks/useHighScores";

const Leaderboard = () => {
  const [highScores] = useHighScores();
  console.log(highScores);
  return (
    <Table striped bordered hover variant="dark" className="m-4">
      <thead>
        <tr>
          <th>Game name</th>
          <th>Your high score</th>
          <th>Best highscore</th>
        </tr>
      </thead>
      <tbody>
        {highScores.length &&
          highScores.map((data) => (
            <tr>
              <td>
                {data.gameName.charAt(0).toUpperCase() + data.gameName.slice(1)}
              </td>
              <td>{data.highScore}</td>
              <td>{data.highScore + 78}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};
export default Leaderboard;
