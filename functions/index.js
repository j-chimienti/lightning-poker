const functions = require("firebase-functions");
const admin = require("firebase-admin");

const { generateSeed } = require("./lib/utils");
const createProfile = require("./lib/create-profile");

admin.initializeApp();

exports.action = functions.https.onRequest(async (request, response) => {
  try {
    const { playerId, accountId } = request.body;

    console.log(playerId, accountId);
    console.log(generateSeed());
    return response.send({ success: true });
  } catch (e) {
    return response.status(500).send({ ...response.body, error: e.message });
  }
});

exports.createProfile = functions.auth
  .user()
  .onCreate(createProfile(admin.firestore()));
