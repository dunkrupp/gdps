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
  dispatch: function (object) {
    return object.message
  }
}
