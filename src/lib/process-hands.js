const texasHoldem = require("./texas-holdem");
const { getState, updateState } = require("./db-utils");
const { DEAL, SHOWDOWN, NEW_ROUND } = require("./types");

const SHOWDOWN_EXTRA_DELAY = 6000;
const NEW_ROUND_DELAY = 1100;

const newHand = async (db, tableId) => {
  await db.runTransaction(async (tx) => {
    let [players, table] = await getState(db, tx, tableId);

    texasHoldem(table, players, {
      type: DEAL,
    });
    console.log("[hand]", tableId);
    await updateState(db, tx, tableId, table, players);
  });
};

const newRound = async (db, tableId) => {
  await db.runTransaction(async (tx) => {
    let [players, table] = await getState(db, tx, tableId);

    texasHoldem(table, players, {
      type: NEW_ROUND,
    });
    await updateState(db, tx, tableId, table, players);
  });
};

module.exports = async (db) => {
  let qsnap = await db
    .collection("tables")
    .where("newRoundRequest", "==", true)
    .where("modifiedAt", "<=", new Date(Date.now() - NEW_ROUND_DELAY))
    .get();

  for (let tableSnap of qsnap.docs) {
    if (tableSnap.get("round") === SHOWDOWN) {
      await new Promise((resolve) => setTimeout(resolve, SHOWDOWN_EXTRA_DELAY));
      await newHand(db, tableSnap.id);
    } else await newRound(db, tableSnap.id);
  }
};
