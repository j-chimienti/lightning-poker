/**
 * @name mapRank
 * @param {Card[]} cards
 * @return Card.rank[]
 */
const mapRank =
  (cards) =>
    cards.map((card) => card.rank);

module.exports = mapRank;
