import { CARD_HEIGHT } from "../Card";

export const SIZE = 1000;
export const ASPECT_RATIO = 1.8;

export const POSITION_PADDING = 12;
const POSITION_SIZE = CARD_HEIGHT + 2 * POSITION_PADDING;

export const POSITION_WIDTH = POSITION_SIZE;
export const POSITION_HEIGHT = POSITION_SIZE;
export const START_ANGLE = 25;
export const UPDATE_ACTIVE_STATE = "UPDATE_ACTIVE_STATE";
export const JOIN_CIRCLE_RADIUS = 27;
export const PLAYER_JOINED = "PLAYER_JOINED";

// cards are 60/90

export function formatSats(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// point on the ellipse, fitting in this rect
export function point(width, height, deg, { offset = 0 }) {
  width = width - offset;
  height = height - offset;
  // 1° × π/180 = 0.01745rad
  deg = deg + START_ANGLE;
  return [
    Math.round(
      offset / 2 + width / 2 + (width / 2) * Math.cos(deg * (Math.PI / 180))
    ),
    Math.round(
      offset / 2 + height / 2 + (height / 2) * Math.sin(deg * (Math.PI / 180))
    )
  ];
}
