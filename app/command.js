'use strict'

const config = require('../config/app.json')

/* @todo: command suggestions if not matched */
class Command {
  constructor () {
    this._available = config.commands
    this._prefix = config.prefix
    this._name = null
    this._action = null
    this._target = null
    this._details = null
    this._class = null
    this._error = null
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

  get error () {
    return this._error
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

  set error (value) {
    this._error = value
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

    this.name = name
    this.action = action
    this.target = target
    this.details = details

    if (this.validate()) {
      return this.name
    }

    return this.error
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
  * @todo: Check simple/complex type. Sub-actions etc.
  */
  validate () {
    if (this.exists()) {
      const syntax = this.instance
      const action = syntax[this.action]

      /* Simple Command */
      if (syntax && syntax.type === 'simple') {
        return true
      }

      if (syntax && syntax.type === 'complex') {
        /* @todo: add complex logic, assign errors for later processing */
      }

      /* Complex Command */
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
