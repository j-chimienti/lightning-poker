const map = require("./map-rank");

const hasStraightAceLow =
  (cards) => String(map(cards)) === "A,5,4,3,2";

module.exports = hasStraightAceLow;
