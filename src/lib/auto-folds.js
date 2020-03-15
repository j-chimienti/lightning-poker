const texasHoldem = require("./texas-holdem");
const { getState, updateState } = require("./db-utils");
const { FOLD } = require("./types");

const foldPlayer = async (db, tableId, playerId) => {
  await db.runTransaction(async tx => {
    let [players, table] = await getState(db, tx, tableId);

    texasHoldem(table, players, {
      type: FOLD,
      playerId
    });

    await updateState(db, tx, tableId, table, players);
  });
};

module.exports = async db => {
  const qsnap = await db
    .collection("players")
    .where("active", "==", true)
    .where("foldAt", "<=", new Date())
    .get();
  if (qsnap.empty) return;

  for (let playerSnap of qsnap.docs) {
    await foldPlayer(db, playerSnap.get("tableId"), playerSnap.id);
    console.log("autofold", playerSnap.id);
  }
};
