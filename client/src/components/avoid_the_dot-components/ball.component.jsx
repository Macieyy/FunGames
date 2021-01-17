import React from "react";

const Ball = React.forwardRef((props, setRef) => {
  const { x, y, size, sprite, } = props;
  const ballStyle = {
    backgroundImage: `url(${sprite})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: `${size}px`,
    width: `${size}px`,
    left: `${x}px`,
    top: `${y}px`,
  };

  if (sprite.includes("redBall")) {
    return <div ref={setRef} id="enemy" className="ball" style={ballStyle} />
  }
  else{
	return <div ref={setRef} className="ball" style={ballStyle} />
  }
});

export default Ball;
