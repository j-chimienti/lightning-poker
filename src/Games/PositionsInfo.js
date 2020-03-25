import React from "react";
import { mapPosition } from "../Table/Players";

function PositionsInfo({ map = [], maxPlayers }) {
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
        {[...Array(maxPlayers)].map((e, i) => (
          <circle
            key={i}
            id={`position-${i + 1}`}
            cx="270"
            cy="10"
            fill={
              map.find(p => p === mapPosition(maxPlayers, i))
                ? "white"
                : "rgba(255,255,255,0.15)"
            }
            r="20"
            style={{
              transformOrigin: "center",
              transform: `rotate(${(
                (i * 360) / maxPlayers +
                360 / maxPlayers
              ).toFixed(2)}deg)`
            }}
          />
        ))}
      </g>
    </svg>
  );
}

export default PositionsInfo;
