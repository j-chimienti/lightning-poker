import React, { useContext } from "react";
import Player from "./Player";
import Join from "./JoinRoom";
import { RoomContext } from "./index";
import {
  formatSats,
  POSITION_WIDTH,
  POSITION_HEIGHT,
  CHIP_SIZE,
  point
} from "./utils";
import { PORTRAIT, LANDSCAPE } from "../App";
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

function Dealer({ x, y, width, height }) {
  return (
    <svg x={x} y={y} width={width} height={height} viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="#ff8c00"
        stroke="#fee"
        strokeWidth="5"
      />
      <text
        fill="#fee"
        x="50%"
        y="50%"
        fontSize="50"
        fontWeight="500"
        textAnchor="middle"
        dy="20"
      >
        D
      </text>
    </svg>
  );
}

function Position({ tablePosition }) {
  let {
    width,
    height,
    tablePositions,
    maxPlayers,
    players,
    table: { posMap = [], dealer } = {},
    tableId,
    orientation,
    activePlayerId
  } = useContext(RoomContext);

  let position = mapPosition(maxPlayers, tablePosition);
  if (!position) {
    return null;
  }

  let active = posMap.includes(position);

  let t = 360 / tablePositions;
  const [x, y] = point(width, height, t * position + t / 2, {
    offset: 80,
    dw: orientation === PORTRAIT ? -12 : 20,
    dh: orientation === PORTRAIT ? 20 : -12
  });
  let [x1, y1] = point(width, height, t * position + t / 2, {
    offset: 255,
    dw: orientation === PORTRAIT ? -28 : 20,
    dh: orientation === PORTRAIT ? 20 : -28
  });

  // TODO: use better solution
  if (position === 4) {
    y1 += 15;
    x1 += 5;
  }

  if (position === 7) {
    x1 += 5;
    y1 += 5;
  }

  let chips;
  if (active) {
    let player = players[position];
    if (player) {
      if (player.bet > 0) chips = formatSats(player.bet);
      if (player.winner) {
        chips = `+${formatSats(player.profit - player.chipsBet)}`;
      }
    }
  }

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
      {active && dealer === position && (
        <Dealer
          className="dealer-chip"
          x={x1 - CHIP_SIZE / 2}
          y={y1 - CHIP_SIZE / 2}
          width={CHIP_SIZE}
          height={CHIP_SIZE}
        />
      )}
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
            position={position}
            chips={chips}
            dealer={active && dealer === position}
          />
        </svg>
      )}
    </>
  );
}

export default Position;
