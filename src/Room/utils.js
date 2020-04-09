import { CARD_WIDTH, CARD_HEIGHT } from "../Card";

export const SIZE = 1000;
export const ASPECT_RATIO = 1.8;

const POSITION_PADDING = 20;

export const POSITION_WIDTH = 2 * POSITION_PADDING + 2 * CARD_WIDTH - 5; //155
export const POSITION_HEIGHT = 2 * POSITION_PADDING + CARD_HEIGHT; // 130
export const START_ANGLE = 25;
export const UPDATE_ACTIVE_STATE = "UPDATE_ACTIVE_STATE";
export const JOIN_CIRCLE_RADIUS = 27;
export const PLAYER_JOINED = "PLAYER_JOINED";

// cards are 60/90

// point on the ellipse, fitting in this rect
export function point(width, height, deg, offset = 0) {
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
