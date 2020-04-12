import React from "react";
import { generateChipStack, CHIP_VALUES_REVERSED } from "../lib/utils";
import { formatSats, CHIP_SIZE } from "./utils";
import { Chip2 as Chip } from "../Chip";

export function getPotChipStackWidth(pot) {
  let chipStacks = generateChipStack(pot);
  return CHIP_VALUES_REVERSED.filter(v => chipStacks[v]).length * CHIP_SIZE;
}

function Stack({ x, value, amount }) {
  return (
    <g>
      {[...Array(amount)].map((e, i) => (
        <Chip
          x={x}
          y={Math.min(i, 15) * -2}
          value={value}
          key={i}
          width={CHIP_SIZE}
          height={CHIP_SIZE}
        />
      ))}
    </g>
  );
}

function Pot({ pot }) {
  let chipStacks = generateChipStack(pot);

  return (
    <g>
      {CHIP_VALUES_REVERSED.filter(v => chipStacks[v]).map(
        (v, i) =>
          chipStacks[v] && (
            <Stack x={i * CHIP_SIZE} value={v} key={v} amount={chipStacks[v]} />
          )
      )}
      {pot && (
        <foreignObject x="0" y={CHIP_SIZE + 2} width="100%" height="32">
          <div className="bet-text">
            <div>{formatSats(pot)}</div>
          </div>
        </foreignObject>
      )}
    </g>
  );
}

export default Pot;
