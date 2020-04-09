import React, { useContext } from "react";
import Player from "./Player";
import Join from "./JoinRoom";
import { RoomContext } from "./index";
import { POSITION_WIDTH, POSITION_HEIGHT, point } from "./utils";

function Position({ position, orientation }) {
  const {
    width,
    height,
    maxPlayers,
    table: { posMap = [] } = {},
    tableId
  } = useContext(RoomContext);

  let t = 360 / maxPlayers;
  const [x, y] = point(width, height, t * position + t / 2, 80);

  return (
    <svg
      x={x - POSITION_WIDTH / 2}
      y={y - POSITION_HEIGHT / 2}
      width={POSITION_WIDTH}
      height={POSITION_HEIGHT}
    >
      {posMap.includes(position) ? (
        <Player />
      ) : (
        <Join tableId={tableId} position={position} />
      )}
    </svg>
  );
}

export default Position;
