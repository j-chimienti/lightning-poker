const texasHoldem = require("./texas-holdem");
const { getState, updateState } = require("./db-utils");
const { DEAL, SHOWDOWN } = require("./types");

// const SHOWDOWN_DELAY = 4000;

const newGame = async (db, tableId) => {
  await db.runTransaction(async tx => {
    let [players, table] = await getState(db, tx, tableId);

    texasHoldem(table, players, {
      type: DEAL
    });

    await updateState(db, tx, tableId, table, players);
  });
};

module.exports = async db => {
  const qsnap = await db
    .collection("tables")
    .where("round", "==", SHOWDOWN)
    .get();
  if (qsnap.empty) return;

  for (let tableSnap of qsnap.docs) {
    await newGame(db, tableSnap.id);
    console.log("round", tableSnap.id);
  }
};
