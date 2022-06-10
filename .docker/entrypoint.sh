#!/bin/bash
mkdir /Users/imac/www/docker
npm install
npm run typeorm migration:run
npm run dev
