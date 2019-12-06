'use strict'

const discord = require('discord.js')
const Bot = require('./bot')
const Database = require('./database')

class Offender {
  constructor () {
    this.command = 'offender'
    this.table = 'offenders'
    this.fields = ['name', 'alliance']
    this.connection = new Database({ table: this.table })
    this.embed = new discord.RichEmbed()
    this.bot = new Bot()
  }

  search (id) {
    this.connection.find(

    )
  }

  add (params) {
    this.connection.create(

    )
  }

  get message () {
    // Create Dynamic Embed
  }

  run (command) {
    //
  }
}

module.exports = Offender
