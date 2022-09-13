const { SITTING, JOIN } = require("./types");
const texasHoldem = require("./texas-holdem");
const { loadProfile, getState, updateState } = require("./db-utils");

module.exports = async (db, { tableId, profileId, position }) => {
  if (![1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(position)) {
    throw new Error("Invalid position, should be between 1 and 10");
  }

    let [players, table] = await getState(db, tableId);

    if (players.find(player => player.position === position)) {
      throw new Error("Player position is assigned");
    }

    if (players.length >= table.maxPlayers) {
      throw new Error("Table is full");
    }

    let { balance, hash: profileHash } = await loadProfile(db, profileId);

    if (players.find(p => p.profileHash === profileHash)) {
      throw new Error("You are already playing on this table");
    }

    let chips = table.buyIn;

    if (!table.fun) {
      if (balance < chips || balance < 0 || chips <= 0) {
        throw new Error(
          "You don't have enought balance to join this table. Please deposit some satoshis or try some of the free tables"
        );
      }
    }

    // cheks are fine, we can add new player
    const player = {
      chips,
      position,
      profileHash,
      tableId,
      profileId,
      bet: 0,
      hands: 0,
      state: SITTING
    };

    // play money!!
    if (!table.fun) {
      balance = balance - chips;
    }

    players.push(player);
    const newPlayerRef = db.collection("players").doc();

    // tx.create(newPlayerRef, player);
    db.collection("profiles").updateOne({profileId}, {
      $set: {
        balance
      }
    })

    player.id = newPlayerRef.id;

    // call game with action: join
    texasHoldem(table, players, {
      type: JOIN
    });

    await updateState(db, tableId, table, players);

};
