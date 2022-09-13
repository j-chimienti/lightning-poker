import React from "react";
import { point } from "../Room/utils";
import { mapPosition } from "../Room/Position";

function PositionsInfo({ map = [], maxPlayers }) {
  let tablePositions = Math.max(8, maxPlayers);
  let width = 540;
  let height = 400;
  const positions = [...Array(tablePositions).keys()]
    .map(i => {
      let position = mapPosition(maxPlayers, i);
      let active = map.includes(position);
      let t = 360 / tablePositions;
      let [x, y] = point(width, height, t * position + t / 2, {
        offset: 80
      });
      return [position, x, y, active];
    })
    .filter(([position]) => position);

  return (
    <svg viewBox="0 0 540 400" className="positions-info">
      <rect
        x="106.5"
        y="114.5"
        width="326"
        height="171"
        rx="85.5"
        fill="#08D362"
        stroke="rgba(255,255,255,0.05)"
      />
      <g className="positions">
        {positions.map(([, x, y, active]) => {
          return (
            <circle
              key={x}
              cx={x}
              cy={y}
              r={20}
              fill={active ? "white" : "rgba(255,255,255,0.15)"}
            />
          );
        })}
      </g>
    </svg>
  );
}

export default PositionsInfo;
