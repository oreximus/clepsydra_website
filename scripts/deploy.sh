#!/bin/bash

set -e

cd /home/ubuntu/clepsydra_website/frontEnd

echo "Pulling latest code from Git"
git pull origin main

echo "Installing dependencies"
npm install

echo "Making build"
npm run build

echo "Restarting the frontEnd"
pm2 restart 0


