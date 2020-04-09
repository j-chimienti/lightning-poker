import React, { useContext } from "react";
import Player from "./Player";
import Join from "./JoinRoom";
import { RoomContext } from "./index";
import { POSITION_WIDTH, POSITION_HEIGHT, point } from "./utils";

export function mapPosition(maxPlayers, position) {
  if (maxPlayers < 8) {
    return {
      2: [1, 5],
      3: [1, 4, 6],
      4: [2, 4, 6, 8],
      5: [2, 4, 5, 6, 8],
      6: [1, 2, 4, 5, 6, 8],
      7: [1, 2, 4, 5, 6, 7, 8]
    }[maxPlayers][position];
  } else {
    return position + 1;
  }
}

function Position({ tablePosition }) {
  const {
    width,
    height,
    tablePositions,
    maxPlayers,
    players,
    table: { posMap = [] } = {},
    tableId,
    activePlayerId
  } = useContext(RoomContext);

  let position = mapPosition(maxPlayers, tablePosition);
  if (!position) {
    return null;
  }

  let C;

  if (posMap.includes(position)) {
    C = <Player {...players[position]} />;
  } else {
    if (!activePlayerId) {
      C = <Join tableId={tableId} position={position} />;
    } else {
      return null;
    }
  }

  let t = 360 / tablePositions;
  const [x, y] = point(width, height, t * position + t / 2, 80);

  return (
    <svg
      x={x - POSITION_WIDTH / 2}
      y={y - POSITION_HEIGHT / 2}
      width={POSITION_WIDTH}
      height={POSITION_HEIGHT}
    >
      {C}
    </svg>
  );
}

export default Position;
