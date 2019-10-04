'use strict'

/** Config */
const config = require('./config/app.json')
const pfx = config.prefix

/** Bootstrap Application */
const app = require('./bootstrap/app')
const discord = require('discord.js')

/** Classes */
const Client = new discord.Client()
const Help = new app.Help()
const Roe = new app.Roe()
const Citation = new app.Citation()

Client.on('ready', () => {
  const fs = require('fs')

  fs.access(config.database, error => {
    if (!error) {
      console.log('Database Ready')
    } else {
      console.log('No Database Found')
    }
  })
  console.log('Bot Ready')
})

Client.on('message', message => {
  if (
    message.author.bot ||
    !message.content.startsWith(pfx)
  ) {
    return false
  }

  if (message.content.startsWith(pfx)) {
    const args = message.content.slice(pfx.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    switch (command) {
      case 'help':
        message.channel.send(
          Help.message
        )
        break
      case 'roe':
        message.channel.send(
          Roe.message
        )
        break
      case 'citations':
        message.channel.send(
          Citation.dispatch(command)
        )
        break
    }
  }
})

Client.login(config.token)
