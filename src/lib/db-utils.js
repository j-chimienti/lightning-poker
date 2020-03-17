const loadPlayers = async (db, tx, tableId) => {
  let players = (await tx.get(
    db.collection("players").where("tableId", "==", tableId)
  )).docs.map(doc => ({ ...doc.data(), id: doc.id }));

  // load profileId for each player, needed for cards encryption
  const profileSnaps = await Promise.all(
    players.map(({ profileHash }) => {
      return tx.get(
        db
          .collection("profiles")
          .where("hash", "==", profileHash)
          .select()
          .limit(1)
      );
    })
  );

  players.forEach((player, indx) => {
    player.profileId = profileSnaps[indx].docs[0].id;
  });

  return players;
};

const loadTable = async (db, tx, tableId) => {
  const tableSnap = await tx.get(db.collection("tables").doc(tableId));
  if (!tableSnap.exists) {
    throw new Error("table not found");
  }
  const tablePrivatesSnap = await tx.get(
    db.collection("tablePrivates").doc(tableId)
  );

  let seed;
  if (tablePrivatesSnap.exists) {
    seed = tablePrivatesSnap.get("seed");
  }

  return { ...tableSnap.data(), seed };
};

const loadProfile = async (db, tx, profileId) => {
  const profileSnap = await tx.get(db.collection("profiles").doc(profileId));

  if (!profileSnap.exists) {
    throw new Error("account not found");
  }

  return { ...profileSnap.data(), id: profileSnap.id };
};

const getState = async (db, tx, tableId) => {
  return Promise.all([
    loadPlayers(db, tx, tableId),
    loadTable(db, tx, tableId)
  ]);
};

const updateState = async (db, tx, tableId, table, players) => {
  // save players state back to database
  for (let player of players) {
    const { id: playerId } = player;
    const ref = db.collection("players").doc(playerId);

    // used intern, don't save
    delete player.id;
    delete player.profileId;

    if (player.leaving) {
      tx.delete(ref);
    } else tx.update(ref, player);
  }

  // save table state back to database
  tx.set(
    db.collection("tablePrivates").doc(tableId),
    { seed: table.seed },
    { merge: true }
  );
  delete table.seed;
  tx.update(db.collection("tables").doc(tableId), table);
};

module.exports = {
  loadPlayers,
  loadTable,
  loadProfile,
  getState,
  updateState
};
