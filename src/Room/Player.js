import React from "react";
import Card from "../Card";

function Player() {
  return (
    <g className="player-new">
      <Card x={20} y={20} />
      <Card x={20 + 60 - 5} y={20} />
    </g>
  );
}

export default Player;
