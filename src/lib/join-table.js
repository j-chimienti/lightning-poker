const { SITTING, JOIN } = require("./types");
const texasHoldem = require("./texas-holdem");
const { loadProfile, getState, updateState } = require("./db-utils");

module.exports = async (db, { tableId, profileId, position }) => {
  if (![1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(position)) {
    throw new Error("position is invalid, should be between 1 and 10");
  }

  await db.runTransaction(async tx => {
    let [players, table] = await getState(db, tx, tableId);

    if (players.find(player => player.position === position)) {
      throw new Error("player position is assigned");
    }

    if (players.length >= table.maxPlayers) {
      throw new Error("table is full");
    }

    let { balance, hash: profileHash } = await loadProfile(db, tx, profileId);

    if (players.find(p => p.profileHash === profileHash)) {
      throw new Error("user is already playing on this table");
    }

    let chips = table.buyIn;

    if (balance < chips || balance < 0 || chips <= 0) {
      throw new Error("You don't have enought balance to join this table");
    }

    // cheks are fine, we can add new player
    const player = {
      chips,
      position,
      profileHash,
      tableId,
      bet: 0,
      hands: 0,
      state: SITTING
    };

    players.push(player);
    balance = balance - chips;

    const newPlayerRef = db.collection("players").doc();

    tx.create(newPlayerRef, player);
    tx.update(db.collection("profiles").doc(profileId), { balance });

    player.id = newPlayerRef.id;
    console.log(player);

    // call game with action: join
    texasHoldem(table, players, {
      type: JOIN
    });

    await updateState(db, tx, tableId, table, players);
  });
};
