const map = require("../utils/map-rank");

const strength = require("../domain/ranks");

const cardHigh =
  (cards) => ({
    name: "Card High",
    kickers: map(cards.slice(1)),
    rank: cards[0].rank,
    strength: strength.get("highest-card"),
  });

module.exports = cardHigh;
