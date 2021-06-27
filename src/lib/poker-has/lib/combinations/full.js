const map = require("../utils/map-rank");
const exclude = require("../utils/exclude-rank");

const strength = require("../domain/ranks");

const full =
  (cards, rank) => {
    return ({
      name: "Full House",
      kickers: [
        map(exclude(cards, rank[0]))[0],
      ],
      rank: rank[0],
      strength: strength.get("full-house"),
    });
  };

module.exports = full;
