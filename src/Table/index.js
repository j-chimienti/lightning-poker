import React, { useEffect, useState } from "react";
import Body from "./body";
import "./styles.scss";
import { HORIZONTAL_LAYOUT, VERTICAL_LAYOUT } from "./defs";

function Table() {
  const [layout, setLayot] = useState(HORIZONTAL_LAYOUT);

  useEffect(() => {
    window.onresize = () => {
      if (window.innerHeight > window.innerWidth) {
        setLayot(VERTICAL_LAYOUT);
      } else setLayot(HORIZONTAL_LAYOUT);
    };
    window.onresize();
  }, []);

  return (
    <div
      className={`table ${layout === VERTICAL_LAYOUT ? "vertical" : ""}`.trim()}
    >
      <Body layout={layout} />
    </div>
  );
}

export default Table;
