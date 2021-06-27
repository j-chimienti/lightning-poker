const map = require("../utils/map-rank");
const exclude = require("../utils/exclude-rank");

const strength = require("../domain/ranks");

const poker =
  (cards, rank) => ({
    name: "Poker",
    kickers: map(exclude(cards, rank[0])),
    rank: rank[0],
    strength: strength.get("poker"),
  });

module.exports = poker;
