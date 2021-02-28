import React from "react";

const Ball = (props => {
  const { x, y, size, sprite, index } = props;
  const ballStyle = {
    backgroundImage: `url(${sprite})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: `${size}px`,
    width: `${size}px`,
    left: `${x}px`,
    top: `${y}px`,
  };

 	return <div id={"ball"+index} className="ball" style={ballStyle} />
});

export default Ball;
