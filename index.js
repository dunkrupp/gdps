'use strict'

require('dotenv').config();

const discord = require('discord.js');
const client = new discord.Client();
const sqlite3 = require('sqlite3').verbose();

client.on('ready', () => {
  console.log('Bot ready');
})

client.on('message', (message) => {
  if (message.content.startsWith('ping')) {
    message.channel.send('pong')
  }
})

client.login(process.env.BOT_TOKEN);
