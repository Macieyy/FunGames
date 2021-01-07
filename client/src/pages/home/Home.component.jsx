import React from "react";
import GamePanel from "../../components/game-panel/game-panel.component";
import "./Home.styles.css";

class Home extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
    };
  }


  render() {
    return (
      <div className="home d-flex flex-column align-items-center">
        <GamePanel />
      </div>
    );
  }
}
export default Home;
