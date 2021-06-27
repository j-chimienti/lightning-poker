/**
 * @name excludeRank
 * @param {Card[]} cards
 * @param {String} excludedRanks
 * @return Card[]
 */
const excludeRank =
  (cards, ...excludedRanks) => cards.filter((card) => !excludedRanks.includes(card.rank));

module.exports = excludeRank;
