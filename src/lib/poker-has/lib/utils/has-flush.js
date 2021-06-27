const groupBy = require("./group-by");

/**
 * Determine whether the cards have all the same type,
 * a flush.
 * @name hasFlush
 * @param {Card[]} cards
 * @return {Boolean}
 */
const hasFlush =
  (cards) => Object.keys(groupBy("type")(cards)).length === 1;

module.exports = hasFlush;
