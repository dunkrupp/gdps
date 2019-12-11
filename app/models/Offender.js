'use strict'

const OffenderRepository = require('../repositories/OffenderRepository')

class Offender {
  constructor () {
    this._repository = new OffenderRepository()
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

  get repository () {
    return this._repository
  }

  search (value) {
    return this.repository.search(value)
  }

  add () {
    return this.repository.create({ name: this.name, alliance: this.alliance })
  }

  run (command) {
    this[command.action]()
  }
}

module.exports = Offender
