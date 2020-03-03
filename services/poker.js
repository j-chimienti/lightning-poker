#!/usr/bin/env node

// TODO use server time for player progress.....
const { generateSeed } = require("./lib/utils");

console.log(generateSeed());
