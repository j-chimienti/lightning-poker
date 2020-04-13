import React from "react";
// import { generateChipStack } from "../lib/utils";
import { Chip2 as Chip } from "../Chip";
import { CHIP_SIZE } from "./utils";

function PlayerBet({ chips, tablePosition }) {
  let dx = 0;
  let justifySelf = "start";
  let padding = "4px 4px 4px 17px";
  if ([5, 6, 7].includes(tablePosition)) {
    dx = -CHIP_SIZE * 4;
    justifySelf = "end";
    padding = "4px 17px 4px 4px";
  }

  return (
    <g>
      {chips && (
        <>
          <foreignObject
            x={dx + CHIP_SIZE - CHIP_SIZE / 2}
            y={0}
            width={CHIP_SIZE * 4}
            height={CHIP_SIZE}
          >
            <div className="bet-text">
              <div
                style={{
                  justifySelf,
                  padding
                }}
              >
                {chips}
              </div>
            </div>
          </foreignObject>
          <Chip width={CHIP_SIZE} height={CHIP_SIZE} />
        </>
      )}
    </g>
  );
}

export default PlayerBet;
