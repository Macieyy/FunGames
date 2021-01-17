import React from "react";
import Actor from "./actor.component";
import useKeyPress from "../../hooks/useKeyPress";
import useWalk from "../../hooks/useWalk";

const Player = ({setRef}) => {
  const { dir, step, walk, position } = useWalk(3);
  const data = {
    h: 32,
    w: 32,
  };

  useKeyPress((e) => {
    walk(e.key.replace("Arrow", "").toLowerCase());
    e.preventDefault();
  });

  return <Actor data={data} step={step} dir={dir} position={position} setRef={setRef} />;
};

export default Player;
