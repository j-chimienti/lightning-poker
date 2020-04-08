import React, { createContext, useContext } from "react";
import { AppContext, PORTRAIT } from "../App";
import Card from "../Card";
import "./styles.scss";

export const RoomContext = createContext();

const SIZE = 1000;
const SCALE = 0.8;
const ASPECT_RATIO = 1.8;

function Table({ orientation, children }) {
  let width = SIZE;
  let height = Math.round(width / ASPECT_RATIO);

  if (orientation === PORTRAIT) {
    height = SIZE;
    width = Math.round(height / ASPECT_RATIO);
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
        x={Math.round((width - width * SCALE) / 2)}
        y={Math.round((height - height * SCALE) / 2)}
        width={width * SCALE}
        height={height * SCALE}
        rx={260}
        stroke="rgba(255,255,255,0.05)"
      />
      {children}
    </svg>
  );
}

// cards are 60/90

// landscape
// width

const Player = ({ position }) => (
  <g className="player-new">
    <Card x={20} y={20} />
    <Card x={20 + 60 - 5} y={20} />
  </g>
);

const POSITION_WIDTH = 20 + 20 + 2 * 60 - 5; //155
const POSITION_HEIGHT = 90 + 20 + 20; // 130

const landscapeOffset = position => {
  // landscape
  let dw = (SIZE - POSITION_WIDTH) / 2;
  let dy = (SIZE / ASPECT_RATIO - POSITION_HEIGHT) / 2;
  let x = dw;
  let y = dy;

  switch (position) {
    case 2:
      x = dw - 260;
      y = dy + 190;
      break;

    case 3:
      x = dw - 400;
      break;

    case 4:
      x = dw - 260;
      y = dy - 190;
      break;

    case 5:
      y = dy - 220;
      break;

    case 6:
      x = dw + 260;
      y = dy - 190;
      break;

    case 7:
      x = dw + 400;
      break;

    case 8:
      x = dw + 260;
      y = dy + 190;
      break;

    // 1
    default:
      y = dy + 220;
  }
  return [x, y];
};

const portraitOffset = position => {
  // landscape
  let dw = Math.round((SIZE / ASPECT_RATIO - POSITION_WIDTH) / 2);
  let dy = Math.round((SIZE - POSITION_HEIGHT) / 2);
  let x = dw;
  let y = dy;

  // TODO: calculate later
  const ox = 200;
  const oy = 250;
  const oy1 = 390;

  switch (position) {
    case 2:
      x = dw - ox;
      y = dy + oy;
      break;

    case 3:
      x = dw - ox;
      break;

    case 4:
      x = dw - ox;
      y = dy - oy;
      break;

    case 5:
      y = dy - oy1;
      break;

    case 6:
      x = dw + ox;
      y = dy - oy;
      break;

    case 7:
      x = dw + ox;
      break;

    case 8:
      x = dw + ox;
      y = dy + oy;
      break;

    // 1
    default:
      y = dy + oy1;
  }
  return [x, y];
};

function Position({ position, orientation }) {
  let [x, y] = landscapeOffset(position);
  if (orientation === PORTRAIT) {
    [x, y] = portraitOffset(position);
  }
  return (
    <svg x={x} y={y} width={POSITION_WIDTH} height={POSITION_HEIGHT}>
      {/* <rect width={POSITION_WIDTH} height={POSITION_HEIGHT} fill="blue" /> */}
      <Player />
    </svg>
  );
}

function Positions(args) {
  return (
    <>
      <Position position={1} {...args} />
      <Position position={2} {...args} />
      <Position position={3} {...args} />
      <Position position={4} {...args} />
      <Position position={5} {...args} />
      <Position position={6} {...args} />
      <Position position={7} {...args} />
      <Position position={8} {...args} />
    </>
  );
}

function Room({ match }) {
  let {
    state: { orientation }
  } = useContext(AppContext);

  return (
    <div className="room">
      <Table orientation={orientation}>
        <Positions orientation={orientation} />
      </Table>
    </div>
  );
}

export default Room;
