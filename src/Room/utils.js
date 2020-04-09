export const SIZE = 1000;
export const SCALE = 0.8;
export const ASPECT_RATIO = 1.8;
export const POSITION_WIDTH = 20 + 20 + 2 * 60 - 5; //155
export const POSITION_HEIGHT = 90 + 20 + 20; // 130
export const START_ANGLE = 25;
export const UPDATE_ACTIVE_STATE = "UPDATE_ACTIVE_STATE";
export const JOIN_CIRCLE_RADIUS = 27;
export const PLAYER_JOINED = "PLAYER_JOINED";

// cards are 60/90

// point on the ellipse, fitting in this rect
export const point = (width, height, deg, offset = 0) => {
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
};
