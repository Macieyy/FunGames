import React from "react"
import "./game-panel.styles.css"
import MenuGame from "../menu-game-item/menu-game-item.component"


class GamePanel extends React.Component {
    constructor() {
        super();
        this.state = {
            games: [
                {
                    title: 'Cubes',
                    imageUrl: 'https://i.ibb.co/5xgb5Jj/Cubes-Screen.jpg',
                    id: 1,
                    linkUrl: 'cubes'
                },
                {
                    title: 'game2',
                    imageUrl: 'https://st2.depositphotos.com/3040429/5641/i/450/depositphotos_56419261-stock-photo-play.jpg',
                    id: 2,
                    linkUrl: 'game2'
                },
                {
                    title: 'game3',
                    imageUrl: 'https://cdn.pixabay.com/photo/2015/05/13/03/27/first-764971__480.jpg',
                    id: 3,
                    linkUrl: 'game3'
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