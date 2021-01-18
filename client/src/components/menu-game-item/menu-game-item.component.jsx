import React from "react";
import {withRouter} from "react-router-dom";
import "./menu-game-item.styles.css"


const MenuGame = ({ title, image, size, history, linkUrl, match }) => (
    <div className={`${size} menu-game-item d-flex align-items-center justify-content-center`} onClick={()=> history.push(`${match.url}${linkUrl}`)}>
        <div className="background-image" style={{
            backgroundImage: `url(${image})`
        }} />
        <div className="content d-flex flex-column justify-content-center px-4">
            <h1 className="title">{title.toUpperCase()}</h1>
            <span className="subtitle d-flex justify-content-center">PLAY</span>
        </div>
    </div>
)

export default withRouter(MenuGame); 