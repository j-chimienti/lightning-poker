#!/usr/bin/env node
const admin = require("firebase-admin");
const lnService = require("ln-service");

const createInvoices = require("./lib/create-invoices");
const processInvoices = require("./lib/process-invoices");

const serviceAccount = require("./lightning-poker-firebase-adminsdk-pdomv-82e6bf58f2.json");
const config = require("./lnd-config");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const { lnd } = lnService.authenticatedLndGrpc(config);

// subscribe to lnd
processInvoices(db, lnd);

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
