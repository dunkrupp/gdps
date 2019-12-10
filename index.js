'use strict'

/** Config */
const config = require('./config/app.json')

/** Bootstrap Application */
const app = require('./bootstrap/app')

/** Classes */
const Client = new app.Discord.Client()
const Command = new app.Command()

/* Start-up Checks */
Client.on('ready', () => {
  const fs = require('fs')

  /* Check for Database */
  fs.access(config.database, error => {
    if (!error) {
      console.log('Database Ready')
    } else {
      console.log('No Database Found')
    }
  })
  console.log('Bot Ready')

  /* Set Bot */
  Client.user.setStatus('available')
  Client.user.setPresence({
    game: {
      name: 'orders.',
      type: 'LISTENING'
    }
  })
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

  /** @todo: process error if exists */
  if (command.hasErrors()) {
    reply(command.errors)
  } else {
    message.channel.send(
      app.dispatch(command)
    ).catch((error) => {
      console.error(error)
    })
  }

  command.clean()

  /**
   * Respond with any errors.
   * @param errors
   */
  function reply (errors) {
    let text = ''
    if (Array.isArray(errors)) {
      text = errors.map(error => `${error.message}`)
    }
    if (typeof errors === 'string') {
      text = errors
    }
    message.reply(
      text ||
      'I could not find a command that matches that syntax, use .help to see commands available'
    )
  }
})

Client.login(config.token)
