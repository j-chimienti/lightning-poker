#!/usr/bin/env node

// service file (ubuntu)
// /lib/systemd/system/poker.service

// service example
// [Unit]
// Description=Lightning Poker Service
// After=network.target
//
// [Service]
// Type=simple
// User=root
// ExecStart=/opt/lightning-poker/poker.js
// Restart=on-failure
//
// [Install]
// WantedBy=multi-user.target

const admin = require("firebase-admin");

const serviceAccount = require("./lightning-poker-firebase-adminsdk-pdomv-82e6bf58f2.json");
const processAutoFolds = require("./lib/auto-folds");
const processHands = require("./lib/process-hands");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

(async () => {
  do {
    try {
      await processAutoFolds(db);
    } catch (e) {
      console.log("ERROR", e);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } while (true);
})();

(async () => {
  do {
    try {
      await processHands(db);
    } catch (e) {
      console.log("ERROR", e);
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  } while (true);
})();
