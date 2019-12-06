'use strict'

const discord = require('discord.js')
const Bot = require('./bot')
const Offender = require('./offender')
const Database = require('./database')

class Citation {
  constructor () {
    this.table = 'citations'
    this.fields = ['offender_id', 'note']
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

  search (id) {
    this.connection.where('')
  }

  total (id) {
    //
  }

  current (id) {
    //
  }

  add (params) {
    // Find or Create Offender

    this.connection.create(params)
  }

  clear (id) {
    //
  }

  resolve (id) {
    //
  }

  get message () {
    // Create Dynamic Embed
  }

  run (command) {
    this.command = command
    return this[command.action]()
  }
}

module.exports = Citation
