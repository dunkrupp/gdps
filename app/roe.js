const discord = require('discord.js')
const Bot = require('./bot')

class Roe {
  constructor () {
    this.command = 'roe'
    this.title = 'Rules of Engagement'
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
    this.embed.addField('Rules', 'TBD')
  }
}

module.exports = Roe
