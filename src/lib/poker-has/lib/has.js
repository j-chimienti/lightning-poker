const sortByRank = require("./utils/sort-by-rank");

const getValuesWhichAppearTimes = require("./utils/get-values-which-appear-times");

const groupByRank = require("./utils/group-by-rank");

const hasFlush = require("./utils/has-flush");
const hasStraight = require("./utils/has-straight");
const hasStraightAceHigh = require("./utils/has-straight-ace-high");

const cardHighOf = require("./combinations/card-high");
const pairOf = require("./combinations/pair");
const doublePairOf = require("./combinations/double-pair");
const threeOfAKindOf = require("./combinations/three-of-a-kind");
const straightOf = require("./combinations/straight");
const flushOf = require("./combinations/flush");
const fullRankOf = require("./combinations/full");
const pokerOf = require("./combinations/poker");
const straightFlushOf = require("./combinations/straight-flush");
const royalStraightFlushOf = require("./combinations/royal-staight-flush");

const has = (cards) => {
  cards = sortByRank(cards);

  if (hasFlush(cards)) {
    // possible point:
    // royal-straight-flush, straight-flush, flush

    if (hasStraight(cards)) {
      // royal-straight-flush
      if (hasStraightAceHigh(cards)) {
        return royalStraightFlushOf(cards);
      }

      // straight-flush
      return straightFlushOf(cards);
    }

    // flush
    return flushOf(cards);
  }

  // possible point:
  // poker, full-house, stright, three-of-a-kind, double-pair, pair, highest-card

  const groupedCards = groupByRank(cards);

  switch (Object.keys(groupedCards).length) {
    case 2:
      // poker
      const pokerRank = getValuesWhichAppearTimes(groupedCards, 4);
      if (pokerRank.length) {
        return pokerOf(cards, pokerRank);
      }

      // full-house
      const fullRank = getValuesWhichAppearTimes(groupedCards, 3);
      return fullRankOf(cards, fullRank);

    case 3:
      // three-of-a-kind
      const threeOfAKindRank = getValuesWhichAppearTimes(groupedCards, 3);
      if (threeOfAKindRank.length) {
        return threeOfAKindOf(cards, threeOfAKindRank);
      }

      // double-pair
      const doublePairRank = getValuesWhichAppearTimes(groupedCards, 2);
      return doublePairOf(cards, doublePairRank);

    case 4:
      // pair
      const pairRank = getValuesWhichAppearTimes(groupedCards, 2);
      return pairOf(cards, pairRank);

    case 5:
      // straight
      if (hasStraight(cards)) {
        return straightOf(cards);
      }

      // highest card
      return cardHighOf(cards);
  }
};

module.exports = has;
