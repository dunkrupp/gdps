'use strict'

/** Config */
const config = require('./config/app.json')
const pfx = config.prefix

/** Autoload */
const app = require('./app/autoload')
const discord = require('discord.js')

/** Classes */
const client = new discord.Client()
const help = new app.Help()

client.on('ready', () => {
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

client.on('message', message => {
  if (
    message.author.bot ||
    !message.content.startsWith(pfx)
  ) {
    return false
  }

  if (message.content.startsWith(pfx)) {
    const command = message.content.trimStart()

    console.log(command)

    switch (command) {
      case pfx + 'help':
        console.log(help)
        message.channel.send(help.message)
        break
      case pfx + 'roe':
        message.channel.send('roe test')
        break
      case pfx + 'citations':
        message.channel.send('citations test')
        break
      case pfx + 'player':
        message.channel.send('player test')
        break
      case pfx + 'config':
        message.channel.send('config test')
        break
    }
  }
})

client.login(config.token)
