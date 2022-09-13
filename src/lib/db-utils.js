const loadPlayers = async (db,  tableId) => {
  let players = await db.collection("players").findMany({tableId})

  // load profileId for each player, needed for cards encryption
  const profileSnaps = await Promise.all(
    players.map(({ profileHash }) => {
      return db.collection("profiles").findOne({hash: profileHash})
    })
  );

  players.forEach((player, indx) => {
    player.profileId = profileSnaps[indx].docs[0].id;
  });

  return players;
};

const loadTable = async (db, tableId) => {
  const tableSnap = await db.collection("tables").findOne({tableId});
  if (!tableSnap.exists) {
    throw new Error("table not found");
  }
  const tablePrivatesSnap = await db.collection("tablePrivates").findOne({tableId})

  let seed;
  if (tablePrivatesSnap.exists) {
    seed = tablePrivatesSnap.get("seed");
  }

  return { ...tableSnap.data(), seed };
};

const loadProfile = async (db, tx, profileId) => {
  const profileSnap = await  db.collection("profiles").findOne({profileId})

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

const updateState = async (db, tableId, table, players) => {
  for (let player of players) {
    const { id: playerId } = player;
    const ref = db.collection("players").findOne({playerId});

    // used intern, don't save
    delete player.id;
    delete player.profileId;

    if (player.leaving) {
      db.collection("players").deleteOne({playerId});
    } else db.collection("players").replaceOne({playerId}, player);
  }

  // save players position
  table.posMap = players
    .filter(player => !player.leaving)
    .map(player => player.position);

  // save table state back to database
  db.collection("tablePrivates").updateOne({tableId}, {$set: { seed: table.seed, merge: true }})
  delete table.seed;
  db.collection("tables").replaceOne({tableId}, table);
};

module.exports = {
  loadPlayers,
  loadTable,
  loadProfile,
  getState,
  updateState
};
