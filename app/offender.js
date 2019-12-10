'use strict'

const discord = require('discord.js')
const Bot = require('./bot')
const Database = require('./database')

class Offender {
  constructor () {
    this.table = 'offenders'
    this.connection = new Database({ table: this.table })
    this.embed = new discord.RichEmbed()
    this.bot = new Bot()
    this._name = null
    this._alliance = null
  }

  get name () {
    return this._name
  }

  set name (value) {
    this._name = value
  }

  get alliance () {
    return this._alliance
  }

  set alliance (value) {
    this._alliance = value
  }

  search (name) {
    return this.connection.where('name', name)
  }

  add () {
    return this.connection.create(
      { name: this.name, alliance: this.alliance }
    )
  }

  get message () {
    // Create Dynamic Embed
  }

  run (command) {
    this[command.action]()
    return this.message
  }
}

module.exports = Offender
