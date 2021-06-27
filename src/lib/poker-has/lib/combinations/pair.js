const map = require("../utils/map-rank");
const exclude = require("../utils/exclude-rank");

const strength = require("../domain/ranks");

const pair =
  (cards, rank) => ({
    name: "Pair",
    kickers: map(exclude(cards, rank[0])),
    rank: rank[0],
    strength: strength.get("pair"),
  });

module.exports = pair;
