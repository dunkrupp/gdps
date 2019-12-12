'use strict'

const AbstractCommand = require('./AbstractCommand')
const OffenderRepository = require('../repositories/OffenderRepository')

class OffenderCommand extends AbstractCommand {
  constructor () {
    super()
    this.title = ''
    this.description = ''
    this._repository = new OffenderRepository()
  }

  get message () {
    this.headers()
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

module.exports = OffenderCommand
