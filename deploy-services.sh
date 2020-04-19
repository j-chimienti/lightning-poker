#!/usr/bin/env bash

#poker is a OpenSSH config shortcut
echo 'deploying services...'
scp -r ./services/*.json ./services/*.js ./services/lib poker:services/
ssh poker "cd ~/services && chmod +x poker.js wallet.js"
echo 'installing npm dependencies...'
ssh poker "cd ~/services && npm install"
