import React from "react";
import {StyledDisplay} from "./styles/StyledDisplay"
const Display =({gameOver, text, game}) => (
    <StyledDisplay gameOver={gameOver} game={game}>{text}</StyledDisplay>
)
export default Display;