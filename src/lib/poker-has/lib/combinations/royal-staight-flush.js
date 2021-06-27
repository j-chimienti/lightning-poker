const strength = require("../domain/ranks");

const royalStraightFlush =
  (cards) => ({
    name: "Royal flush",
    kickers: [],
    rank: "A",
    strength: strength.get("royal-straight-flush"),
  });

module.exports = royalStraightFlush;
