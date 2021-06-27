const strength = require("../domain/ranks");

const getStraightRank =
  (cards) => cards[0].rank === "A"
    ? "5"
    : cards[0].rank;

const straightFlush =
  (cards) => ({
    name: "Straight Flush",
    kickers: [],
    rank: getStraightRank(cards),
    strength: strength.get("straight-flush"),
  });

module.exports = straightFlush;
