const leaveTabe = require("./leave-table");

module.exports = async db => {
  const qsnap = await db
    .collection("players")
    .where("active", "==", true)
    .where("foldAt", "<=", new Date())
    .get();
  if (qsnap.empty) return;

  for (let playerSnap of qsnap.docs) {
    await leaveTabe(db, {
      playerId: playerSnap.id,
      tableId: playerSnap.get("tableId")
    });
    console.log("force-leave", playerSnap.id);
  }
};
