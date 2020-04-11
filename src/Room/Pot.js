import React from "react";
import {
  generateChipStack
  // CHIP_VALUES_REVERSED
} from "../lib/utils";

export const POT_CHIP_SIZE = 50;

function Pot({ pot }) {
  const chipStacks = generateChipStack(pot);
  console.log(chipStacks);
  return (
    <g>
      <rect width={"100%"} height={"100%"} fill="blue" />
    </g>
  );
}

export default Pot;
