'use strict'

const config = require('../config/app.json')

class Command {
  constructor () {
    this._available = config.commands
    this._prefix = config.prefix
    this._name = null
    this._action = null
    this._target = null
    this._details = null
  }

  get available () {
    return this._available
  }

  get instance () {
    return this._available[this.name][this.action]
  }

  get prefix () {
    return this._prefix
  }

  get name () {
    return this._name
  }

  get action () {
    return this._action
  }

  get target () {
    return this._target
  }

  get details () {
    return this._details
  }

  set name (value) {
    this._name = value
  }

  set action (value) {
    this._action = value
  }

  set target (value) {
    this._target = value
  }

  set details (value) {
    this._details = value.join(' ')
  }

  /**
   * @param message
   * @returns {Command}
   */
  parse (message) {
    const parts = this.parts(message)
    const [name, action, target, ...details] = parts

    this.name = name
    this.action = action
    this.target = target
    this.details = details

    if (this.validate()) {
      return this
    }

    return null
  }

  /**
   * @param message
   * @returns {string[]}
   */
  parts (message) {
    return message.slice(this._prefix.length).trim().split(/ +/g)
  }

  validate () {
    if (this.exists()) {
      const structure = this.instance
      const full = structure.long
      const short = structure.short
      const args = structure.args
      console.log(full, short, args)
    }
  }

  /**
   * @returns {boolean}
   */
  exists () {
    return this.name in this.available
  }
}

module.exports = Command
