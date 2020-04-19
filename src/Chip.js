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

export function Chip({ x, y, height, width, value, customColor }) {
  const color = COLORS[CHIP_VALUES.indexOf(value)] || customColor || "#2E8B57";
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
