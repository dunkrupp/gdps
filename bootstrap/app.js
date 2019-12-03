'use strict'

module.exports = {
  /** Export Classes */
  Bot: require('../app/bot'),
  Citation: require('../app/citation'),
  Command: require('../app/command'),
  Help: require('../app/help'),
  Offender: require('../app/offender'),
  Roe: require('../app/roe'),
  Discord: require('discord.js'),

  /** Export Methods */
  /**
   * Retrieves an instance of the class from the container.
   * @param instance
   */
  resolve: function (instance) {
    return new this[instance]()
  },

  /**
   * Checks if an object exists in the container.
   * @param instance
   * @returns {boolean}
   */
  exists: function (instance) {
    return typeof this[instance] !== 'undefined'
  },

  /**
   * Capitalizes first character of string
   * @param string
   * @returns {string}
   */
  capitalize: function (string) {
    if (typeof string !== 'string') return ''
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}
