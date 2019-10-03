const config = require('../config/bot.json')

class Bot {
  constructor () {
    this.name = config.name
  }

  get getName () {
    return this.name
  }
}

module.exports = Bot
