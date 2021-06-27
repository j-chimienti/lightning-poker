const groupBy = require("./group-by");

/**
 * Group the cards into an object by rank.
 * The card rank is used as object key,
 * and the value is the number of times the rank appears.
 * @name groupByRank
 * @param {Card[]} cards
 * @return {Object}
 */
const groupByRank = groupBy("rank");

module.exports = groupByRank;
