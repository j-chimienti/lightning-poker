import React from "react";
// import { generateChipStack } from "../lib/utils";
import Chip from "../Chip";
import { BET_CHIP_STACK_SIZE } from "./Position";
import { formatSats } from "./utils";

function PlayerBet({ bet, tablePosition }) {
  // const chipStacks = generateChipStack(chips);
  let dx = 0;
  let textAnchor = "start";
  if ([5, 6, 7].includes(tablePosition)) {
    dx = -BET_CHIP_STACK_SIZE;
    textAnchor = "end";
  }

  return (
    <g>
      {bet && (
        <>
          <Chip
            x={0}
            y={0}
            value={50}
            width={BET_CHIP_STACK_SIZE}
            height={BET_CHIP_STACK_SIZE}
          />
          <defs>
            <filter x="0" y="0" width="1" height="1" id="solid">
              <feFlood flood-color="rgba(0,0,0,0.3)" />
              <feComposite in="SourceGraphic" operator="xor" />
            </filter>
          </defs>
          <text
            filter="url(#solid)"
            x={dx + BET_CHIP_STACK_SIZE}
            y={22}
            width={BET_CHIP_STACK_SIZE * 2}
            height={BET_CHIP_STACK_SIZE}
            fontSize={16}
            text-anchor={textAnchor}
          >
            {"\u00a0"}
            {formatSats(bet)}
            {"\u00a0"}
          </text>
          <text
            x={dx + BET_CHIP_STACK_SIZE}
            y={22}
            width={BET_CHIP_STACK_SIZE * 2}
            height={BET_CHIP_STACK_SIZE}
            fontSize={16}
            text-anchor={textAnchor}
          >
            {"\u00a0"}
            {formatSats(bet)}
            {"\u00a0"}
          </text>
        </>
      )}
    </g>
  );
}

export default PlayerBet;
