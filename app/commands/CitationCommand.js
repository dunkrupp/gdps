'use strict'

const AbstractCommand = require('./AbstractCommand')
const CitationRepository = require('../repositories/CitationRepository')
const OffenderRepository = require('../repositories/OffenderRepository')

class CitationCommand extends AbstractCommand {
  constructor () {
    super()
    this.title = ''
    this.description = ''
    this._command = null
    this._repository = new CitationRepository()
    this._offenderRepository = new OffenderRepository()
  }

  get message () {
    this.headers()
    return this.embed
  }

  get command () {
    return this._command
  }

  set command (value) {
    this._command = value
  }

  get repository () {
    return this._repository
  }

  get offenderRepository () {
    return this._offenderRepository
  }

  search (offenderId) {
    this.repository.search(offenderId, 'offender_id')

    return this.message
  }

  total (id) {
    this.repository.search(id, 'offender_id')
  }

  current (id) {
    this.repository.search(id, 'offender_id')
  }

  /**
   * @param offender
   * @param command
   */
  add (offender, command) {
    const row = this.repository.create(
      { offender_id: offender.id, note: command.details }
    )

    const count = this.repository.count(offender.id)

    console.log(count)
    console.log(count.length)

    this.title = `Citation #${count} Issued`
    this.description = `${offender.name}`
    this.embed.addField('Player ID', `${offender.id}`, true)
    this.embed.addField('Citation ID', `${row.id}`, true)

    return this.message
  }

  clear (id) {
    //
  }

  resolve (id) {
    //
  }

  /**
   * @param command
   * @returns {*}
   */
  run (command) {
    this.command = command

    let offender = this.offenderRepository.search(
      this.command.target
    )

    console.log(offender)
    if (!offender) {
      offender = this.offenderRepository.create({
        name: command.target
        /* @todo: regex alliances  */
      })
    }

    if (offender.has('id')) {
      return this[command.action](offender, command)
    } else {
      let msg = ''
      if (!offender.id) {
        msg = 'NO OFFENDER FOUND'
      }
      return `\nError: Arguments Parsed: ${command.name} ${command.action} ${command.target} ${command.details} \nResult: ${msg}`
    }
  }
}

module.exports = CitationCommand
