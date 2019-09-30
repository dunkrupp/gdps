'use strict';

require('dotenv').config();
const fs = require('fs');
const discord = require('discord.js');
const client = new discord.Client();

const config = JSON.parse(
    fs.readFileSync(
        'config/config.json',
        'utf8'
    )
);

client.on('ready', () => {
    console.log('Bot ready');
});

client.on('message',  (message) => {
    if (message.content.startsWith('ping')) {
        message.channel.send('pong');
    }
});

client.login(config.token);