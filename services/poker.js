#!/usr/bin/env node

// TODO use server time for player progress.....
const admin = require("firebase-admin");

const serviceAccount = require("./lightning-poker-firebase-adminsdk-pdomv-82e6bf58f2.json");
const { generateSeed } = require("./lib/utils");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

console.log(generateSeed());
