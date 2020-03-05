const { generateHash } = require("./utils");

const createProfile = db => async user => {
  const hash = generateHash(user.uid);
  await db
    .collection("profiles")
    .doc(user.uid)
    .set({
      balance: 0,
      createdAt: new Date(),
      hash
    });
  console.log(user.uid, hash);
};

module.exports = createProfile;
