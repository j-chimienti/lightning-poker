const map = require("../utils/map-rank");

const strength = require("../domain/ranks");

const flush =
  (cards) => ({
    name: "Flush",
    kickers: map(cards.slice(1)),
    rank: cards[0].rank,
    strength: strength.get("flush"),
  });

module.exports = flush;
