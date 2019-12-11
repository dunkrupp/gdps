'use strict'

const discord = require('discord.js')
const Bot = require('./Bot')

/* @todo: Make driven by markdown or something */
class Roe {
  constructor () {
    this.command = 'roe'
    this.title = 'Rules of Engagement'
    this.description = 'Block description of what this all means.'
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

    return this.embed
  }

  run (command) {
    return this.message
  }
}

module.exports = Roe
