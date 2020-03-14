const deck = require("poker-deck");
const crypto = require("crypto");

const CHIP_VALUES = [1, 5, 10, 20, 50, 100, 500, 1000, 2000, 5000];

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

const generateChipStack = amount => {
  const stacks = {};
  for (let i = CHIP_VALUES.length - 1; i >= 0; i--) {
    if (Math.floor(amount / CHIP_VALUES[i]) > 0) {
      stacks[CHIP_VALUES[i]] = Math.floor(amount / CHIP_VALUES[i]);
      amount = amount % CHIP_VALUES[i];
    }
  }
  return stacks;
};

module.exports = {
  shuffleDeck,
  generateSeed,
  generateHash,
  generateChipStack,
  CHIP_VALUES
};
