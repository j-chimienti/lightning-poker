const map = require("./map-rank");

const hasStraightAceHigh =
  (cards) => String(map(cards)) === "A,K,Q,J,10";

module.exports = hasStraightAceHigh;
