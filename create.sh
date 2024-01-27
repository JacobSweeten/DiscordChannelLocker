#!/bin/bash

sudo docker build . -t insomniabot
sudo docker run -d --restart=always --name insomniabot --volume "/etc/timezone:/etc/timezone:ro" --volume "/etc/localtime:/etc/localtime:ro" insomniabot node main.js
