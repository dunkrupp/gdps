'use strict'

const CitationRepository = require('../repositories/CitationRepository')
const OffenderRepository = require('../repositories/OffenderRepository')

class Citation {
  constructor () {
    this._repository = new CitationRepository()
    this._offenderRepository = new OffenderRepository()
    this._command = null
    this._offender = null
    this._offender_id = null
    this._note = null
  }

  get command () {
    return this._command
  }

  set command (value) {
    this._command = value
  }

  get offender () {
    return this._offender
  }

  set offender (value) {
    this._offender = value
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

  get repository () {
    return this._repository
  }

  get offenderRepository () {
    return this._offenderRepository
  }

  search (id) {
    return this.repository.search(id)
  }

  total (id) {
    this.repository.search(id, 'offender_id')
  }

  current (id) {
    this.repository.search(id, 'offender_id')
  }

  add () {
    this.repository.create(
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
    this.command = command
    console.log(this.offenderRepository)
    this.offender = this.offenderRepository.search(
      this.command.target
    )

    if (!this.offender) {
      this.offender = this.offenderRepository.create({
        name: command.target
        /* @todo: alliances  */
      })
    }

    this.offenderId = this.offender.id
    this.note = command.details
    this[command.action]()

    return this.message
  }
}

module.exports = Citation
