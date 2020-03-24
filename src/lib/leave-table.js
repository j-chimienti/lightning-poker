const { LEAVE } = require("./types");
const texasHoldem = require("./texas-holdem");
const { loadProfile, getState, updateState } = require("./db-utils");

module.exports = async (db, { playerId, tableId }) => {
  await db.runTransaction(async tx => {
    // let players = await loadPlayers(db, tx, tableId);
    let [players, table] = await getState(db, tx, tableId);

    const player = players.find(p => p.id === playerId);
    if (!player) {
      throw new Error("player not found");
    }

    let { balance } = await loadProfile(db, tx, player.profileId);
    let { chips = 0 } = player;

    // play money
    if (!table.fun) {
      balance = balance + chips;
      tx.update(db.collection("profiles").doc(player.profileId), {
        balance
      });
    }

    player.chips = 0;
    player.leaving = true;

    texasHoldem(table, players, {
      type: LEAVE,
      playerId: playerId
    });

    await updateState(db, tx, tableId, table, players);
  });
};
