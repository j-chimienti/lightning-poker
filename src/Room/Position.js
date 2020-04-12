import React, { useContext } from "react";
import Player from "./Player";
import Join from "./JoinRoom";
import { RoomContext } from "./index";
import { POSITION_WIDTH, POSITION_HEIGHT, CHIP_SIZE, point } from "./utils";
import { PORTRAIT } from "../App";
import PlayerBet from "./PlayerBet";

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
  let {
    width,
    height,
    tablePositions,
    maxPlayers,
    players,
    table: { posMap = [] } = {},
    tableId,
    orientation,
    activePlayerId
  } = useContext(RoomContext);

  let position = mapPosition(maxPlayers, tablePosition);
  if (!position) {
    return null;
  }

  let active = posMap.includes(position);
  active = true;

  let t = 360 / tablePositions;
  const [x, y] = point(width, height, t * position + t / 2, {
    offset: 80,
    dw: orientation === PORTRAIT ? -12 : 20,
    dh: orientation === PORTRAIT ? 20 : -12
  });
  const [x1, y1] = point(width, height, t * position + t / 2, {
    offset: 255,
    dw: orientation === PORTRAIT ? -28 : 20,
    dh: orientation === PORTRAIT ? 20 : -28
  });

  return (
    <>
      <svg
        x={x - POSITION_WIDTH / 2}
        y={y - POSITION_HEIGHT / 2}
        width={POSITION_WIDTH}
        height={POSITION_HEIGHT}
      >
        {active ? (
          <Player {...players[position]} />
        ) : !activePlayerId ? (
          <Join tableId={tableId} position={position} />
        ) : null}
      </svg>
      {active && (
        <svg
          className="player-bet"
          x={x1 - CHIP_SIZE / 2}
          y={y1 - CHIP_SIZE / 2}
          width={CHIP_SIZE}
          height={CHIP_SIZE}
        >
          <PlayerBet
            tablePosition={tablePosition}
            bet={players[position] ? players[position].bet : 8888888}
          />
        </svg>
      )}
    </>
  );
}

export default Position;
