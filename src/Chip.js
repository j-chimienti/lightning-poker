import React from "react";

import { CHIP_VALUES } from "./lib/utils";
import { LogoSymbol } from "./Nav/Logo";

const COLORS = [
  "#357f9c",
  "#aa2f2a",
  "#d40f83",
  "#412ebc",
  "#2d3b2c",
  "#993cae",
  "#d45c20",
  "#4B0082",
  "#FF4500"
];

const DISPLAY_VALUES = {
  1000: "1K",
  2000: "2K",
  5000: "5K",
  50000: "50K"
};

function Chip({ x, y, height, width, value }) {
  const color = COLORS[CHIP_VALUES.indexOf(value)] || "black";
  const text = DISPLAY_VALUES[value] || value;
  return (
    <svg
      x={x}
      y={y}
      width={width}
      height={height}
      viewBox="0 0 60 60"
      className="chip"
    >
      <circle opacity=".3" fill="#231F20" cx="30" cy="31" r="27.5" />
      <circle fill={color} cx="30" cy="30" r="26.5" />
      <g fill="#FFF">
        <path d="M26.348 8h-8.877a22.019 22.019 0 00-7.774 9.637h4.17a20.236 20.236 0 00-2.623 11.082 21.962 21.962 0 017.368-11.082 21.878 21.878 0 016.079-3.456h-8.356A20.336 20.336 0 0126.348 8zM52 26.348v-8.88a22.007 22.007 0 00-9.64-7.772v4.167a20.221 20.221 0 00-11.079-2.618 21.931 21.931 0 0111.079 7.366 21.919 21.919 0 013.459 6.077l.001-8.354A20.365 20.365 0 0152 26.348zM33.652 52h8.877a22.03 22.03 0 007.774-9.637h-4.17a20.237 20.237 0 002.623-11.082 21.958 21.958 0 01-7.368 11.082 21.9 21.9 0 01-6.079 3.455h8.356A20.35 20.35 0 0133.652 52zM8 33.652v8.879a22.003 22.003 0 009.64 7.773v-4.168a20.21 20.21 0 0011.079 2.617 21.93 21.93 0 01-11.079-7.365 21.945 21.945 0 01-3.46-6.076v8.354A20.365 20.365 0 018 33.652z" />
      </g>
      <text
        fill="#FEFEFE"
        x="50%"
        y="50%"
        fontSize="15"
        fontWeight="500"
        textAnchor="middle"
        dy=".33em"
      >
        {text}
      </text>
    </svg>
  );
}

export function Chip2({ x, y, height, width, value }) {
  const color = COLORS[CHIP_VALUES.indexOf(value)] || "#2E8B57";
  const text = DISPLAY_VALUES[value] || value;

  return (
    <svg x={x} y={y} width={width} height={height} viewBox="0 0 22 22">
      <circle cx={11} cy={11} r={11} fill="#fe" />
      <path
        d="M11 22c6.08 0 11-4.92 11-11S17.08 0 11 0 0 4.92 0 11s4.92 11 11 11zm6.37-15.84A8.022 8.022 0 0012 3.06V1a10 10 0 017.11 4.16l-1.74 1zm-12.74 0l-1.74-1A10 10 0 0110 1v2.06a8.022 8.022 0 00-5.37 3.1zM3.62 14.1l-1.73 1a9.864 9.864 0 010-8.2l1.73 1a8.03 8.03 0 000 6.2zm3.383 3.83c.922.532 1.941.875 2.997 1.01V21a10 10 0 01-7.11-4.16l1.74-1a8.021 8.021 0 002.373 2.09zm10.367-2.09l1.74 1a10.003 10.003 0 01-7.11 4.1v-2a8.023 8.023 0 005.37-3.1zm2.74-8.94c1.19 2.6 1.19 5.6 0 8.2l-1.73-1a8.03 8.03 0 000-6.2l1.73-1z"
        fill={color}
      />
      {value ? (
        <text
          fill="#fe"
          x="50%"
          y="50%"
          fontSize="8"
          fontWeight="500"
          textAnchor="middle"
          dy=".36em"
        >
          {text}
        </text>
      ) : (
        <LogoSymbol height={12} y={4.5} />
      )}
    </svg>
  );
}

export default Chip;
