import React from "react"
import "./game-panel.styles.css"
import MenuGame from "../menu-game-item/menu-game-item.component"
import CubesBG from "../../resources/sprites/cubes/gamePanelBG.jpg"
import SnakeBG from "../../resources/sprites/snake/gamePanelBG.jpg"
import CatchTheBallBG from "../../resources/sprites/catch_the_ball/gamePanelBG.jpg"

class GamePanel extends React.Component {
    constructor() {
        super();
        this.state = {
            games: [
                {
                    title: 'Cubes',
                    image: CubesBG,
                    id: 1,
                    linkUrl: 'cubes'
                },
                {
                    title: 'Snake',
                    image: SnakeBG,
                    id: 2,
                    linkUrl: 'snake'
                },
                {
                    title: 'Catch the ball',
                    image: CatchTheBallBG,
                    id: 3,
                    linkUrl: 'catch_the_ball'
                }
            ],
        };
    }


    render() {
        return (
            <div className="game-panel d-flex flex-wrap justify-content-between">
                {this.state.games.map(({id, ...otherSectionProps }) => (
                    <MenuGame key={id} {...otherSectionProps} />
                ))}
            </div>
        )
    }
}

export default GamePanel;