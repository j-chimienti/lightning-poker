// use css vars
// use calc

import React, { createContext, useContext } from "react";
import { AppContext, PORTRAIT } from "../App";
import "./styles.scss";

export const RoomContext = createContext();

// function Positions () {
//   return (
//     <g></g>
//   )
// }

function Table({ orientation, children }) {
  let width = 1000;
  let height = width / 1.8;
  let scale = 0.8;

  if (orientation === PORTRAIT) {
    height = 1000;
    width = height / 1.8;
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="table">
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="none"
        stroke="red"
      />
      <rect
        x={(width - width * scale) / 2}
        y={(height - height * scale) / 2}
        width={width * scale}
        height={height * scale}
        rx={260}
        stroke="rgba(255,255,255,0.05)"
      />
      {children}
    </svg>
  );
}

function Room({ match }) {
  let {
    state: { orientation }
  } = useContext(AppContext);

  return (
    <div className="room">
      <Table orientation={orientation}>
        <g></g>
      </Table>
    </div>
  );
}

export default Room;
