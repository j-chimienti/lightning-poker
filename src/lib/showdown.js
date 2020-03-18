const texasHoldem = require("./texas-holdem");
const { getState, updateState } = require("./db-utils");
const { DEAL, SHOWDOWN, NEW_ROUND } = require("./types");

const SHOWDOWN_DELAY = 3000;
const NEW_ROUND_DELAY = 1500;

const newHand = async (db, tableId) => {
  await db.runTransaction(async tx => {
    let [players, table] = await getState(db, tx, tableId);

    texasHoldem(table, players, {
      type: DEAL
    });

    await updateState(db, tx, tableId, table, players);
  });
};

const newRound = async (db, tableId) => {
  await db.runTransaction(async tx => {
    let [players, table] = await getState(db, tx, tableId);

    texasHoldem(table, players, {
      type: NEW_ROUND
    });

    await updateState(db, tx, tableId, table, players);
  });
};

module.exports = async db => {
  let qsnap = await db
    .collection("tables")
    .where("round", "==", SHOWDOWN)
    .where("modifiedAt", "<=", new Date(Date.now() - SHOWDOWN_DELAY))
    .get();

  for (let tableSnap of qsnap.docs) {
    await newHand(db, tableSnap.id);
    console.log("[hand]", tableSnap.id);
  }

  qsnap = await db
    .collection("tables")
    .where("newRoundRequest", "==", true)
    .where("modifiedAt", "<=", new Date(Date.now() - NEW_ROUND_DELAY))
    .get();

  for (let tableSnap of qsnap.docs) {
    await newRound(db, tableSnap.id);
    console.log("[round]", tableSnap.id);
  }
};
