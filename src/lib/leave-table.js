const { LEAVE } = require("./types");
const texasHoldem = require("./texas-holdem");
const {
  loadPlayers,
  loadTable,
  loadProfile,
  updateState
} = require("./db-utils");

module.exports = async (db, { playerId, tableId }) => {
  console.log(playerId, tableId);

  await db.runTransaction(async tx => {
    let players = await loadPlayers(db, tx, tableId);

    const player = players.find(p => p.id === playerId);
    if (!player) {
      throw new Error("player not found");
    }

    const table = await loadTable(db, tx, tableId);
    let { balance } = await loadProfile(db, tx, player.profileId);
    let { chips = 0 } = player;

    balance = balance + chips;
    tx.update(db.collection("profiles").doc(player.profileId), {
      balance
    });

    player.chips = 0;
    player.leaving = true;

    // call game with action: leave
    texasHoldem(table, players, {
      type: LEAVE
    });

    await updateState(db, tx, tableId, table, players);
  });
};
