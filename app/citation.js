'use strict'

const discord = require('discord.js')
const Bot = require('./bot')
const Offender = require('./offender')
const Database = require('./database')

class Citation {
  constructor () {
    this.table = 'citations'
    this.connection = new Database({ table: this.table })
    this.embed = new discord.RichEmbed()
    this.bot = new Bot()
    this._offender_id = null
    this._note = null
  }

  get offenderId () {
    return this._offender_id
  }

  set offenderId (id) {
    this._offender_id = id
  }

  get note () {
    return this._note
  }

  set note (text) {
    this._note = text
  }

  search (id) {
    return this.connection.where('offender_id', id)
  }

  total (id) {
    //
  }

  current (id) {
    //
  }

  add () {
    this.connection.create(
      { offender_id: this.offenderId, note: this.note }
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

  /**
   * @param command
   * @returns {*}
   */
  run (command) {
    const offender = new Offender()
    let target = offender.search(command.target)

    if (!target) {
      target = offender.add({
        name: command.target
        /* @todo: alliances  */
      })
    }

    this.offenderId = target.id
    this[command.action]()

    return this.message
  }
}

module.exports = Citation
