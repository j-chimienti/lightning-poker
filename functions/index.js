const REGION = process.env.REGION || "europe-west1";

const fs = require("fs");
const path = require("path");
const functions = require("firebase-functions").region(REGION);
const admin = require("firebase-admin");
const cors = require("cors")({
  // origin: true
});
const sha256 = require("crypto-js/sha256");
const Base64 = require("crypto-js/enc-base64");

const createProfile = require("./lib/create-profile");
const action = require("./lib/action");
const joinTable = require("./lib/join-table");
const leaveTable = require("./lib/leave-table");

const { JOIN, LEAVE, REQUESTED_INVOICE } = require("./lib/types");

if (process.env.FUNCTIONS_EMULATOR) {
  // load config from services....
  const serviceAccount = require("../services/lightning-poker-firebase-adminsdk-pdomv-82e6bf58f2.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else admin.initializeApp();

exports.action = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    const { type } = request.body || {};
    if (!type) {
      return response.send({});
    }

    console.log(request.body);

    try {
      if (type === JOIN) {
        await joinTable(admin.firestore(), request.body);
      } else if (type === LEAVE) {
        await leaveTable(admin.firestore(), request.body);
      } else {
        await action(admin.firestore(), request.body);
      }
      return response.send({ success: true });
    } catch (e) {
      return response.status(500).send({ error: e.message });
    }
  });
});

exports.actionf = functions.firestore
  .document("/actions/{documentId}")
  .onCreate(async snap => {
    const { type } = snap.data();

    console.log(snap.data());

    try {
      if (type === JOIN) {
        await joinTable(admin.firestore(), snap.data());
      } else if (type === LEAVE) {
        await leaveTable(admin.firestore(), snap.data());
      } else {
        await action(admin.firestore(), snap.data());
      }
    } catch (e) {
      console.log(e.message);
    }
  });

exports.join = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    const { tableId } = request.body || {};
    if (!tableId) {
      return response.send({});
    }

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
    const { tableId } = request.body || {};
    if (!tableId) {
      return response.send({});
    }

    try {
      await leaveTable(admin.firestore(), request.body);
      return response.send({ success: true });
    } catch (e) {
      return response.status(500).send({ error: e.message });
    }
  });
});

exports.lnurlpay = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    let { playerId, amount: msatoshi } = request.query;

    const metadata = JSON.stringify([
      ["text/plain", `Fund account ${playerId} on lightning-poker.com.`],
      ["image/png;base64",
        fs.readFileSync(path.resolve(__dirname, "../public/logo192.png"))
          .toString("base64")
      ]
    ]);

    try {
      if (msatoshi) {
        // return invoice
        let ref = await admin.firestore()
          .collection("invoices")
          .add({
            tokens: Math.floor(Number(msatoshi) / 1000),
            profileId: playerId,
            descriptionHash: Base64.stringify(sha256(metadata)),
            state: REQUESTED_INVOICE
          });

        let request = await new Promise((resolve, reject) => {
          let unsubscribe = ref.onSnapshot(snap => {
            let request = snap.get('payment_request')
            if (request) {
              resolve(request);
              unsubscribe();
            }
          }, reject);
        });

        return response.send({
          pr: request,
          disposable: false,
        });
      } else {
        // return params
        return response.send({
          callback: `${process.env.REACT_APP_FUNCTIONS_URL}/lnurlpay`,
          maxSendable: 1000000000,
          minSendable: 1000,
          metadata,
          tag: "payRequest"
        });
      }
    } catch (e) {
      return response.status(500).send({ error: e.message });
    }
  });
});

exports.createProfile = functions.auth
  .user()
  .onCreate(createProfile(admin.firestore()));
