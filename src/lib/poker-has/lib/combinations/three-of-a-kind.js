const map = require("../utils/map-rank");
const exclude = require("../utils/exclude-rank");

const strength = require("../domain/ranks");

const threeOfAKind =
  (cards, rank) => ({
    name: "Three of a kind",
    kickers: map(exclude(cards, rank[0])),
    rank: rank[0],
    strength: strength.get("three-of-a-kind"),
  });

module.exports = threeOfAKind;
