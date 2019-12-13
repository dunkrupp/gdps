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
  console.log('Bot Ready')

  /* Check for Database */
  fs.access(config.database, error => {
    if (error) {
      throw error
    }
  })
  console.log('Database Ready')

  /* Get Server ID and Roles */
  const server = { guilds: [], roles: [] }
  Client.guilds.forEach(function (guild) {
    server.guilds.push(guild.id)

    guild.roles.forEach((role) => {
      server.roles.push({ id: role.id, name: role.name, permissions: role.permissions })
    })
  })

  const data = JSON.stringify(server, null, 2)

  fs.writeFileSync(app.root_path + '/config/server.json', data, error => {
    if (error) {
      throw error
    }
  })
  console.log('Config Ready')

  /* Set Bot Status */
  Client.user.setStatus('available')
  Client.user.setPresence({
    game: {
      name: 'orders.',
      type: 'LISTENING'
    }
  })
  console.log('Client Ready')
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
