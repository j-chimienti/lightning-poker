const hasStraightAceLow = require("./has-straight-ace-low");

const cardRank = require("../domain/card-rank");

const toRankValue =
  (rank) => {
    const value = cardRank.indexOf(rank);
    if (value < 0) {
      throw new Error("Unknown rank " + rank);
    }
    return Number(value);
  };

const isFollowedByOnePointLowerCard =
  (card, position, cards) => {
    return typeof cards[position + 1] == "undefined" ||
    toRankValue(card.rank) - toRankValue(cards[position + 1].rank) === 1;
  };

const hasStraight =
  (cards) => {
    // Needs to add special check for the straight to 5.
    return cards.every(isFollowedByOnePointLowerCard) || hasStraightAceLow(cards);
  };

module.exports = hasStraight;
