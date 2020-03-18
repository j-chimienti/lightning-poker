#!/usr/bin/env node

const admin = require("firebase-admin");

const serviceAccount = require("./lightning-poker-firebase-adminsdk-pdomv-82e6bf58f2.json");
const processAutoFolds = require("./lib/auto-folds");
const processShowDown = require("./lib/showdown");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

(async () => {
  do {
    try {
      await processAutoFolds(db);
    } catch (e) {
      console.log("ERROR", e);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  } while (true);
})();

(async () => {
  do {
    try {
      await processShowDown(db);
    } catch (e) {
      console.log("ERROR", e);
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  } while (true);
})();
