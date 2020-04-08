import React from "react";

const RADIUS = 500;

function calcilatePoints(sides) {
  const polySideLength =
    2 * (RADIUS * Math.tan(((360 / sides / 2) * Math.PI) / 180));
  return `${(RADIUS - polySideLength / 2).toFixed(1)},0 500,500 ${(
    RADIUS +
    polySideLength / 2
  ).toFixed(1)},0`;
}

function TableBody({ playersCount = 8 }) {
  return (
    <div className="table-body">
      <svg viewBox={`0 0 1000 1000`} preserveAspectRatio="none">
        <g>
          {[...Array(playersCount)].map((e, i) => (
            <polygon
              style={{
                transformOrigin: "center",
                transform: `rotate(${((i * 360) / playersCount).toFixed(2)}deg)`
              }}
              key={i}
              points={calcilatePoints(playersCount)}
            />
          ))}
        </g>
        <g>
          {[...Array(playersCount)].map((e, i) => (
            <circle
              cx={500 + 500 * Math.sin((45 * i * Math.PI) / 180.0)}
              cy={500 + 500 * Math.cos((45 * i * Math.PI) / 180.0)}
              key={i}
              r="20"
              fill="blue"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

export default TableBody;
