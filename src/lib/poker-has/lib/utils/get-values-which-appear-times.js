/**
 * @name getValuesWhichAppearTimes
 * @param {Object} groupedCards
 * @param {Number} time
 * @return {Array}
 */
const getValuesWhichAppearTimes =
  (groupedCards, time) => {
    const values = [];
    for (let k in groupedCards) {
      if (groupedCards.hasOwnProperty(k)) {
        if (groupedCards[k] === time) {
          values.push(k);
        }
      }
    }
    return values;
  };

module.exports = getValuesWhichAppearTimes;
