'use strict'

const discord = require('discord.js')
const Bot = require('./bot')

class Help {
  constructor () {
    this.command = 'help'
    this.title = 'Help | Commands'
    this.description = 'Any references to a \'player\' should be replaced with the target player name. ' +
      '\'id\' with the appopriate identifier.'
    this.embed = new discord.RichEmbed()
    this.bot = new Bot()
  }

  get message () {
    this.embed.setAuthor(this.bot.getName)
    this.embed.setTitle(this.title)
    this.embed.setDescription(this.description)
    this.embed.setColor(5998487)
    this.embed.setTimestamp(Date.now())
    this.embed.addField(
      '```.help```',
      '- Invokes Help Command'
    )
    this.embed.addField(
      '```.citation search \'player\'```',
      '- Displays all citation related information for a user if they exist.'
    )
    this.embed.addField(
      '```.citation total \'player\'```',
      '- Displays total number of citations.'
    )
    this.embed.addField(
      '```.citation current \'player\'```',
      '- Displays most recent citation.'
    )
    this.embed.addField(
      '```.citation add \'player\' \'note\'```',
      '- Add citation to a player.'
    )
    this.embed.addField(
      '```.citation clear \'player\'```',
      '- Add citation to a player.'
    )
    this.embed.addField(
      '```.citation resolve \'player\' \'id\'```',
      '- Remove a citation from a player with \'id\'.'
    )

    return this.embed
  }

  run (command) {
    return this.message
  }
}

module.exports = Help
