const { SITTING, JOIN } = require("./types");
const texasHoldem = require("./texas-holdem");

module.exports = async (db, { tableId, profileId, position }) => {
  if (![1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(position)) {
    throw new Error("position is invalid, should be between 1 and 10");
  }

  await db.runTransaction(async tx => {
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

    console.log("PLAYERS", players);

    if (players.find(player => player.position === position)) {
      throw new Error("player position is assigned");
    }

    const tableSnap = await tx.get(db.collection("tables").doc(tableId));
    if (!tableSnap.exists) {
      throw new Error("table not found");
    }

    const table = tableSnap.data();

    if (players.length >= table.maxPlayers) {
      throw new Error("table is full");
    }

    const profileSnap = await tx.get(db.collection("profiles").doc(profileId));

    if (!profileSnap.exists) {
      throw new Error("account not found");
    }

    let { balance, hash: profileHash } = profileSnap.data();

    if (players.find(p => p.profileHash === profileHash)) {
      throw new Error("user is already playing on this table");
    }

    let chips = table.buyIn;

    if (
      isNaN(chips) ||
      isNaN(balance) ||
      balance < chips ||
      balance < 0 ||
      chips <= 0
    ) {
      throw new Error("You don't have enought balance to join this table");
    }

    // cheks are fine, we can add new player
    const player = {
      chips,
      position,
      profileHash,
      tableId,
      bet: 0,
      hands: 0,
      state: SITTING
    };

    players.push(player);
    balance = balance - chips;

    const newPlayerRef = db.collection("players").doc();

    tx.create(newPlayerRef, player);
    tx.update(profileSnap.ref, { balance });

    player.id = newPlayerRef.id;

    console.log(player);

    // call game with action: join
    texasHoldem(table, players, {
      type: JOIN
    });

    // save players state back to database
    for (let player of players) {
      const { id: playerId } = player;
      const ref = db.collection("players").doc(playerId);
      // used intern, don't save
      delete player.id;
      delete player.profileId;
      tx.update(ref, player);
    }

    // save table state back to database
    tx.update(tableSnap.ref, table);
  });
};
