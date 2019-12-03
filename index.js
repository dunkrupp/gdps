'use strict'

/** Config */
const config = require('./config/app.json')

/** Bootstrap Application */
const app = require('./bootstrap/app')

/** Classes */
const Client = new app.Discord.Client()
const Command = new app.Command()
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
    !message.content.startsWith(config.prefix)
  ) {
    return false
  }

  const command = Command.parse(
    message.content
  )

  switch (command) {
    case 'help': {
      message.channel.send(
        Help.message
      )
      break
    }
    case 'roe': {
      message.channel.send(
        Roe.message
      )
      break
    }
    case 'citation': {
      const response = Citation.dispatch(command)

      if (response) {
        message.channel.send(
          response
        )
      }
      break
    }
    default: {
      // Do Nothing
      break
    }
  }
})

Client.login(config.token)
