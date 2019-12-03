'use strict'

const config = require('../config/app.json')
const app = require('../bootstrap/app')

class Command {
  constructor () {
    this._available = config.commands
    this._prefix = config.prefix
    this._name = null
    this._action = null
    this._target = null
    this._details = null
    this._class = null
  }

  get available () {
    return this._available
  }

  get instance () {
    return this._available[this.name]
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

  get class () {
    return this._class
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

  set class (value) {
    this._class = value
  }

  /**
   * @param message
   * @returns {Command}
   */
  parse (message) {
    const parts = this.parts(message)
    const [name, action, target, ...details] = parts

    this.name = app.capitalize(name)
    this.action = action
    this.target = target
    this.details = details

    if (this.validate()) {
      return app.resolve(this.name)
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

  /*
  * @todo: add shorthands
  */
  validate () {
    if (this.exists()) {
      const syntax = this.instance
      const action = syntax[this.action]

      if (syntax && syntax.args === 0) {
        return true
      }

      if (syntax && action && action in syntax) {
        return true
      }
    }

    return false
  }

  /**
   * @returns {boolean}
   */
  exists () {
    return this.name in this.available
  }
}

module.exports = Command
