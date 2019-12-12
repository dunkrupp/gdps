'use strict'

const AbstractCommand = require('./AbstractCommand')

class RoeCommand extends AbstractCommand {
  constructor () {
    super()
    this.title = 'Rules of Engagement'
    this.description = 'Block description of what this all means.'
  }

  /**
   * @returns {module:"discord.js".RichEmbed}
   */
  get message () {
    this.headers()
    this._embed.addField('Rules', 'TBD')

    return this._embed
  }

  /**
   * @param command
   * @returns {module:"discord.js".RichEmbed}
   */
  run (command) {
    return this.message
  }
}

module.exports = RoeCommand
