const rank = new Map();

rank.set("highest-card", 0);
rank.set("pair", 1);
rank.set("double-pair", 2);
rank.set("three-of-a-kind", 3);
rank.set("straight", 4);
rank.set("flush", 5);
rank.set("full-house", 6);
rank.set("poker", 7);
rank.set("straight-flush", 8);
rank.set("royal-straight-flush", 9);

module.exports = rank;
