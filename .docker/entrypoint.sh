#!/bin/bash
sudo mkdir /home/wesley/teste

sudo npm install
sudo npm run typeorm migration:run
sudo npm run dev
