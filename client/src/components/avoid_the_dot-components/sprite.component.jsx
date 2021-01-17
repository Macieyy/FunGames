import React from "react";
import playerSprite from "../../resources/sprites/avoid_the_dot/player.png"

const Sprite = ({setRef, data, position}) =>{
    const {y, x, h, w} = data;
return(
    <div id="player"
    ref={setRef}
    style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        height: `${h}px`,
        width: `${w}px`,
        backgroundImage: `url(${playerSprite})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: `-${x}px -${y}px`
    }}
    />
)
}

export default Sprite;