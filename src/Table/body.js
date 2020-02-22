import React from "react";

const RADIUS = 500;

function generatePoints(sides) {
  const polySideLength =
    2 * (RADIUS * Math.tan(((360 / sides / 2) * Math.PI) / 180));
  return `${(RADIUS - polySideLength / 2).toFixed(1)},0 500,500 ${(
    RADIUS +
    polySideLength / 2
  ).toFixed(1)},0`;
}

function generateLinePoints(sides) {
  const polySideLength =
    2 * (RADIUS * Math.tan(((360 / sides / 2) * Math.PI) / 180));
  return {
    x1: (RADIUS - polySideLength / 2).toFixed(1),
    y1: 0,
    x2: (RADIUS + polySideLength / 2).toFixed(1),
    y2: 0
  };
}

function TableBody({ players = 10 }) {
  const points = generatePoints(players);
  const linePoints = generateLinePoints(players);

  return (
    <svg
      className="table-body"
      viewBox={`-50 0 ${RADIUS * 2 + 50} ${RADIUS * 2 - 290}`}
    >
      <g transform="scale(1, 0.65) rotate(3)">
        <g>
          {[...Array(players)].map((e, i) => (
            <polygon
              key={i}
              points={points}
              fill="#08D362"
              transform={`rotate(${((i * 360) / players).toFixed(
                2
              )},${RADIUS},${RADIUS})`}
            />
          ))}
        </g>
        <g transform="scale(0.9 0.9)" transform-origin="center" opacity="0.09">
          {[...Array(players)].map((e, i) => (
            <line
              key={i}
              stroke="#000"
              strokeWidth="3"
              {...linePoints}
              transform={`rotate(${((i * 360) / players).toFixed(
                2
              )},${RADIUS},${RADIUS})`}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}

export default TableBody;
