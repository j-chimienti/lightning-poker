const createProfile = db => async user => {
  await db
    .collection("profiles")
    .doc(user.uid)
    .set({
      balance: 0,
      createdAt: new Date()
    });
  console.log(user.uid);
};

module.exports = createProfile;
