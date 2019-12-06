'use strict'

const discord = require('discord.js')
const Bot = require('./bot')
const Database = require('./database')

class Offender {
  constructor () {
    this.table = 'offenders'
    this.fields = ['name', 'alliance']
    this.connection = new Database({ table: this.table })
    this.embed = new discord.RichEmbed()
    this.bot = new Bot()
    this._command = null
  }

  get command () {
    return this._command
  }

  set command (command) {
    this._command = command
  }

  search (name) {
    return this.connection.where('name', name)
  }

  add (params) {
    this.connection.create(
      params
    )
  }

  get message () {
    // Create Dynamic Embed
  }

  run (command) {
    this.command = command
    return this[command.action]
  }
}

module.exports = Offender
