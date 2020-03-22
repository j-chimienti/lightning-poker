#!/usr/bin/env node

// service file (ubuntu)
// /lib/systemd/system/wallet.service

// service example
// [Unit]
// Description=Lightning Poker Service
// After=network.target lnd.service
//
// [Service]
// Type=simple
// User=root
// ExecStart=/opt/lightning-poker/wallet.js
// Restart=on-failure
//
// [Install]
// WantedBy=multi-user.target

const admin = require("firebase-admin");
const lnService = require("ln-service");

const createInvoices = require("./lib/create-invoices");
const processDeposits = require("./lib/process-deposits");
const processWithdrawals = require("./lib/process-withdrawals");

const serviceAccount = require("./lightning-poker-firebase-adminsdk-pdomv-82e6bf58f2.json");
const config = require("./lnd-config");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const { lnd } = lnService.authenticatedLndGrpc(config);

// subscribe to [lnd]
processDeposits(db, lnd);

(async () => {
  do {
    try {
      await createInvoices(db, lnd);
    } catch (e) {
      console.log("ERROR", e);
    }
    await new Promise(resolve => setTimeout(resolve, 3000));
  } while (true);
})();

(async () => {
  do {
    try {
      await processWithdrawals(db, lnd);
    } catch (e) {
      console.log("ERROR", e);
    }
    await new Promise(resolve => setTimeout(resolve, 3000));
  } while (true);
})();
