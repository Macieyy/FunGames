import React from "react";
import Sprite from "./sprite.component";

const Actor = ({ setRef, data, step = 10, dir = 0, position = { x: 0, y: 0 } }) => {
  const { h, w } = data;
  return (
    <Sprite
    setRef={setRef}
      position={position}
      data={{
        x: step * w,
        y: dir * h,
        w,
        h,
      }}
    />
  );
};

export default Actor;
