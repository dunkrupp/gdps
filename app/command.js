'use strict'

const config = require('../config/app.json')

/* @todo: command suggestions if not matched */
class Command {
  constructor () {
    this._available = config.commands
    this._prefix = config.prefix
    this._name = ''
    this._action = ''
    this._target = ''
    this._details = ''
    this._errors = []
  }

  /**
   * @returns {Object}
   */
  get available () {
    return this._available
  }

  /**
   * @returns {*}
   */
  get instance () {
    return this._available[this.name]
  }

  /**
   * @returns {string}
   */
  get prefix () {
    return this._prefix
  }

  /**
   * @returns {[]|*[]}
   */
  get errors () {
    return this._errors
  }

  /**
   * @returns {string}
   */
  get name () {
    return this._name
  }

  /**
   * @returns {string}
   */
  get action () {
    return this._action
  }

  /**
   * @returns {string}
   */
  get target () {
    return this._target
  }

  /**
   * @returns {string}
   */
  get details () {
    return this._details
  }

  /**
   * @param error
   */
  set errors (error) {
    this._errors.push(error)
  }

  /**
   * @param string
   */
  set name (string) {
    this._name = string
  }

  /**
   * @param string
   */
  set action (string) {
    this._action = string
  }

  /**
   * @param string
   */
  set target (string) {
    this._target = string
  }

  /**
   * @param array
   */
  set details (array) {
    if (Array.isArray(array)) {
      this._details = array.join(' ')
    }
  }

  /**
   * @param message
   * @returns {Command}
   */
  parse (message) {
    const [name, action, target, ...details] = this.parts(message)

    this.name = name
    this.action = action
    this.target = target
    this.details = details

    this.validate()

    return this
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
  * @todo: de-noodle this spaghetti
  */
  validate () {
    if (this.exists()) {
      const instance = this.instance

      /* Simple Command */
      if (instance && instance.type === 'simple') {
        return
      }

      /* Complex Command */
      if (instance && instance.type === 'complex') {
        if (!instance.actions[this.action]) {
          const suggestions = this.suggestions()

          this.errors = {
            status: 'error',
            message: `no action provided for command. Actions for .${this.name}: ${suggestions}`
          }
        } else {
          /* @todo: add args names like .command action <arg1> <arg2 */
          if (!this.target) {
            this.errors = {
              status: 'error',
              message: `no target player provided for command .${this.name} ${this.action} <target>`
            }
          }
        }
      }
    } else {
      this.errors = { status: 'error', message: '' }
    }
  }

  /**
   * @returns {boolean}
   */
  exists () {
    return this.name in this.available
  }

  /**
   * Get Suggestions for commands if any.
   * @returns {string}
   */
  suggestions () {
    return Object.keys(this.instance.actions).join(', ')
  }

  /**
   * Clean the command.
   */
  clean () {
    this.name = ''
    this.action = ''
    this.target = ''
    this.details = ''
    this.errors.length = 0
  }

  /**
   * @returns {boolean}
   */
  hasErrors () {
    return this.errors.length > 0
  }
}

module.exports = Command
