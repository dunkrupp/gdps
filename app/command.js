'use strict'

const config = require('../config/app.json')

class Command {
  constructor () {
    this._commands = config.commands
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
  get commands () {
    return this._commands
  }

  /**
   * @returns {*}
   */
  get instance () {
    return this._commands[this.name]
  }

  /**
   * @returns {string}
   */
  get prefix () {
    return this._prefix
  }

  /**
   * @returns {[]}
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
   * @param   error
   */
  set errors (error) {
    this._errors.push(error)
  }

  /**
   * @param   {string}  string
   */
  set name (string) {
    this._name = string
  }

  /**
   * @param   {string}  string
   */
  set action (string) {
    this._action = string
  }

  /**
   * @param   {string}  string
   */
  set target (string) {
    this._target = string
  }

  /**
   * @param   {Array}   array
   */
  set details (array) {
    if (Array.isArray(array)) {
      this._details = array.join(' ')
    }
  }

  /**
   * @param   {string}  message
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
      /* Simple Command */
      if (this.is('simple')) {
        return
      }

      /* Complex Command */
      if (this.is('complex')) {
        if (!this.actionExists()) {
          this.errors = {
            status: 'error',
            message: `no action provided for command. Actions for .${this.name}: ${this.suggestions()}`
          }
        } else {
          if (!this.target) {
            this.errors = {
              status: 'error',
              message: `no target player provided for command .${this.name} ${this.action} ${this.args()}`
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
    return this.name in this.commands
  }

  /**
   * @returns {*|NotificationAction}
   */
  actionExists () {
    return this.instance.actions[this.action]
  }

  /**
   * Get Suggestions for commands if any.
   * @returns {string}
   */
  suggestions () {
    return Object.keys(this.instance.actions).length > 0
      ? Object.keys(this.instance.actions).join(', ')
      : ''
  }

  /**
   * @returns {string}
   */
  args () {
    return this.actionExists() && this.instance.actions[this.action].args.length > 0
      ? this.instance.actions[this.action].args.map(function (arg) {
        return '<' + arg + '>'
      }).join(' ')
      : ''
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

  /**
   * @param   {string}  type
   * @returns {boolean}
   */
  is (type) {
    return this.instance && this.instance.type === type
  }
}

module.exports = Command
