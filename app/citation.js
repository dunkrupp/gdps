'use strict'

const discord = require('discord.js')
const Bot = require('./bot')
const Offender = require('./offender')
const Database = require('./database')

class Citation {
  constructor () {
    this.command = 'citation'
    this.table = 'citations'
    this.fields = ['offender_id', 'note']
    this.connection = new Database({ table: this.table })
    this.embed = new discord.RichEmbed()
    this.bot = new Bot()
  }

  search (id) {
    this.connection.find(
      //
    )
  }

  total (id) {
    //
  }

  current (id) {
    //
  }

  add (params) {
    // Find or Create Offender

    this.connection.create(

    )
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
    // Do logic

    return ''// Embed or Text?
  }
}

module.exports = Citation
