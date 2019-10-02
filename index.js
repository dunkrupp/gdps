'use strict'

require('dotenv').config()

const discord = require('discord.js')
const offender = require('./lib/offender')
const citation = require('./lib/citation')
const client = new discord.Client()

client.on('ready', () => {
  console.log('Bot ready')
})

client.on('message', (message) => {
  if (message.author.bot) {
    return false
  }
})

client.login(process.env.BOT_TOKEN)
