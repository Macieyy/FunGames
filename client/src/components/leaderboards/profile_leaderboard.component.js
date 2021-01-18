import React from "react";
import Table from "react-bootstrap/Table";
import { useHighScores } from "../../hooks/useHighScores";

const Leaderboard = () => {
  const [highScores] = useHighScores();
  return (
    <div>
      <h1 className="text-center m-0 p-3" style={{ color: "white", backgroundColor:"#454d55" }}>Leaderboard</h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Game name</th>
            <th>Your high score</th>
          </tr>
        </thead>
        <tbody>
          {highScores.length &&
            highScores.map((data) => (
              <tr>
                <td>
                  {data.gameName.charAt(0).toUpperCase() +
                    data.gameName.slice(1)}
                </td>
                <td>{data.highScore}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};
export default Leaderboard;
