const MAX_AUTOFOLDS_BEFORE_FORCE_LEAVE = 2;

const leaveTabe = require("./leave-table");
const action = require("./action");
const { FOLD } = require("./types");

module.exports = async db => {
  const qsnap = await db
    .collection("players")
    .where("active", "==", true)
    .where("foldAt", "<=", new Date())
    .get();
  if (qsnap.empty) return;

  for (let playerSnap of qsnap.docs) {
    const playerId = playerSnap.id;
    let { autofoldCount = 0, tableId } = playerSnap.data();

    if (autofoldCount >= MAX_AUTOFOLDS_BEFORE_FORCE_LEAVE) {
      await leaveTabe(db, {
        playerId,
        tableId
      });
      console.log("[leave]", playerId);
    } else {
      autofoldCount++;
      await action(db, {
        playerId,
        tableId,
        type: FOLD,
        autofoldCount
      });
      console.log("[fold]", playerId);
    }
  }
};
