import React from "react";
import GamePanel from "../../components/game-panel/game-panel.component";
import "./Home.styles.css";

class Home extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="home d-flex flex-column align-items-center">
        <GamePanel />
        <a
          style={{ position: "fixed", bottom: "0", right: "0", color: "white" }}
          href="https://www.freepik.com/vectors/star"
        >
          Star vector created by upklyak - www.freepik.com
        </a>
      </div>
    );
  }
}
export default Home;
