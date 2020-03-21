#!/usr/bin/env bash

#pkr1 is a OpenSSH config shortcut

echo 'deploying services...'
scp -r ./services/*.json ./services/*.js ./services/lib pkr1:/opt/lightning-poker/
echo 'installing npm dependencies...'
ssh pkr1 "cd /opt/lightning-poker && npm install"
ssh pkr1 "cd /opt/lightning-poker && chmod +x poker.js wallet.js" 
