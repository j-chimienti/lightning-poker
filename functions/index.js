const functions = require("firebase-functions").region("europe-west1");
const admin = require("firebase-admin");
const cors = require("cors")({
  // origin: true
});

const createProfile = require("./lib/create-profile");
const action = require("./lib/action");
const joinTable = require("./lib/join-table");
const leaveTable = require("./lib/leave-table");

if (process.env.FUNCTIONS_EMULATOR) {
  // load config from services....
  const serviceAccount = require("../services/lightning-poker-firebase-adminsdk-pdomv-82e6bf58f2.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else admin.initializeApp();

exports.action = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    try {
      await action(admin.firestore(), request.body);
      return response.send({ success: true });
    } catch (e) {
      return response.status(500).send({ error: e.message });
    }
  });
});

exports.join = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    try {
      await joinTable(admin.firestore(), request.body);
      return response.send({ success: true });
    } catch (e) {
      return response.status(500).send({ error: e.message });
    }
  });
});

exports.leave = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    try {
      await leaveTable(admin.firestore(), request.body);
      return response.send({ success: true });
    } catch (e) {
      return response.status(500).send({ error: e.message });
    }
  });
});

exports.createProfile = functions.auth
  .user()
  .onCreate(createProfile(admin.firestore()));
