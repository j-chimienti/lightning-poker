const deck = require("poker-deck");
const crypto = require("crypto");

const shuffleDeck = seed => {
  const gameDeck = Array.from(deck);
  let currentIndex = deck.length,
    temporaryValue,
    randomIndex;

  seed -= 666; // my devils disbalance !

  const random = function() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  // shuffle based on seed
  while (0 !== currentIndex) {
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = gameDeck[currentIndex];
    gameDeck[currentIndex] = gameDeck[randomIndex];
    gameDeck[randomIndex] = temporaryValue;
  }
  return gameDeck;
};

const generateSeed = () => Math.round(Math.random() * 10000000000);

const generateHash = account => {
  return crypto
    .createHash("sha256")
    .update(account)
    .digest("hex")
    .substr(0, 10);
};

module.exports = {
  shuffleDeck,
  generateSeed,
  generateHash
};
