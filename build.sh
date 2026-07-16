#!/usr/bin/env bash
# Recompiles src/main.ts -> script.js
# Usage: ./build.sh   (requires `npm install` once beforehand)
set -e
npx tsc
cp dist-ts-tmp/main.js script.js
rm -rf dist-ts-tmp
echo "Built script.js from src/main.ts"
