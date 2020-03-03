const functions = require("firebase-functions");
const { generateSeed } = require("./lib/utils");

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
