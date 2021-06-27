const strength = require("../domain/ranks");

const getStraightRank =
  (cards) => {
    if (cards[0].rank !== "A") {
      return cards[0].rank;
    }

    // When the highest card is an Ace
    // I need to distinguish between
    // straight to 5 (A,2,3,4,5) which has rank 5,
    // and straight to A (10, J, Q, K, A) which has rank A.
    // Since cards are sorted I can simply check the second card.
    return cards[1].rank === "5"
      ? "5"
      : "A";
  };

const straight =
  (cards, rank) => {
    getStraightRank(cards);

    return {
      name: "Straight",
      kickers: [],
      rank: getStraightRank(cards),
      strength: strength.get("straight"),
    };
  };

module.exports = straight;
