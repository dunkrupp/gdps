'use strict'

const AbstractModel = require('./AbstractModel')

class Citation extends AbstractModel {
  constructor () {
    super()
    this.offenderId = null
    this.note = null
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
}

module.exports = Citation
