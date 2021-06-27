const rank = require("../domain/card-rank");

/**
 * Sort the cards by rank.
 * The order of sorting is from the highest rank to the lowest.
 * @name sortByRank
 * @param {Card[]} cards
 * @return {Card[]}
 * @example
 * sortByRank([{rank:"7", type:"H"}, {rank:"9", type:"H"}, {rank:"A", type:"S"}, {rank:"2", type:"D"}, {rank:"3", type:"C"}]);
 *  > [{rank:"A", type:"H"}, {rank:"9", type:"H"}, {rank:"7", type:"S"}, {rank:"3", type:"D"}, {rank:"2", type:"C"}]
 */
const sortByRank =
  (cards) => cards.slice()
    .sort((card1, card2) => rank.indexOf(card2.rank) - rank.indexOf(card1.rank));

module.exports = sortByRank;
