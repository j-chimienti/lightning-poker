import React, { useContext, useState, useEffect } from "react";
import { TableContext } from "../Table";
import { PlayerContext } from "../Table/Players";
import ChipStack from "../ChipStack";

function PlayerChips({ position }) {
  const { coordinates } = useContext(TableContext);
  const { chips } = useContext(PlayerContext);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const ref = React.createRef();
  const [x1, y1] = coordinates[position];
  const [x2, y2] = coordinates["center"];
  const d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  const d2 = 0.7 * d;
  const left = (d2 * (x1 - x2)) / d + x2;
  const top = (d2 * (y1 - y2)) / d + y2;

  useEffect(() => {
    if (ref.current) {
      let { width, height } = ref.current.getBoundingClientRect();
      setWidth(Math.round(width));
      setHeight(Math.round(height));
    }
  }, [ref, width, height]);

  return (
    <div
      ref={ref}
      style={{
        top: top - height / 2,
        left: left - width / 2
      }}
      className="player-chips"
    >
      <ChipStack chips={chips} />
      <div>{chips}</div>
    </div>
  );
}

export default PlayerChips;
