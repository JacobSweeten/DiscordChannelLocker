#!/bin/bash

sudo docker build . -t insomniabot
sudo docker run -d --restart=always --name insomniabot insomniabot node main.js
