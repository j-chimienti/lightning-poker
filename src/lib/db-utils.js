const loadPlayers = async (db, tx, tableId) => {
  let players = (await tx.get(
    db.collection("players").where("tableId", "==", tableId)
  )).docs.map(doc => ({ ...doc.data(), id: doc.id }));

  // load profileId for each player, needed for cards encryption
  const profileSnaps = await Promise.all(
    players.map(p => {
      return tx.get(
        db
          .collection("profiles")
          .where("hash", "==", p.profileHash)
          .select()
          .limit(1)
      );
    })
  );

  players.forEach((player, indx) => {
    player.profileId = profileSnaps[indx].docs[0]
      ? profileSnaps[indx].docs[0].id
      : "";
  });

  return players;
};

const loadTable = async (db, tx, tableId) => {
  const tableSnap = await tx.get(db.collection("tables").doc(tableId));
  if (!tableSnap.exists) {
    throw new Error("table not found");
  }

  return tableSnap.data();
};

const loadProfile = async (db, tx, profileId) => {
  const profileSnap = await tx.get(db.collection("profiles").doc(profileId));

  if (!profileSnap.exists) {
    throw new Error("account not found");
  }

  return { ...profileSnap.data(), id: profileSnap.id };
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
  tx.update(db.collection("tables").doc(tableId), table);
};

module.exports = {
  loadPlayers,
  loadTable,
  loadProfile,
  updateState
};
