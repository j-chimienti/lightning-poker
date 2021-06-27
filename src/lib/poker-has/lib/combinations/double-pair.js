const map = require("../utils/map-rank");
const exclude = require("../utils/exclude-rank");

const cardRank = require("../domain/card-rank");
const strength = require("../domain/ranks");

const sortRank =
  (rank1, rank2) =>
    cardRank.indexOf(rank1) > cardRank.indexOf(rank2)
      ? [rank1, rank2]
      : [rank2, rank1];

const doublePair =
  (cards, rank) => {
    const [mainRank, firstKicker] = sortRank(rank[0], rank[1]);

    return {
      name: "Double Pair",
      kickers: [
        firstKicker,
        map(exclude(cards, mainRank, firstKicker))[0],
      ],
      rank: mainRank,
      strength: strength.get("double-pair"),
    };
  };

module.exports = doublePair;
