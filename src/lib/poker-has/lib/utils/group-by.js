const groupBy =
  (prop) =>
    (cards) =>
      cards.reduce((group, card) => {
        const groupItem = card[prop];
        group[groupItem] = group[groupItem] == null
          ? 1
          : group[groupItem] + 1;
        return group;
      }, {});

module.exports = groupBy;
