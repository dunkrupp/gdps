'use strict'

const AbstractCommand = require('./AbstractCommand')

class RoeCommand extends AbstractCommand {
  constructor () {
    super()
    this.title = 'Rules of Engagement'
    this.description = 'All players must alert the miner of the situation a few minutes prior to taking over the node with the exception of zero node (see "Zero Node Consideration").'
  }

  /**
   * @returns {module:"discord.js".RichEmbed}
   */
  get message () {
    this.headers()
    this.embed.addField('...', 'Removal of a ship from a mine')
    this.embed.addField('1.', 'If the ship is at Zero node and no response from the individual within a certain time.')
    this.embed.addField('2.', 'If the ship is OPC')
    this.embed.addField('3.', 'If the player has violated RoE.')
    this.embed.addBlankField()
    this.embed.addField('...', 'Zero Node Consideration')
    this.embed.addField('1.', 'If previous messages to the player have not been answered, you can take the mine.')
    this.embed.addField('2.', 'If you discover the miner on zero node (upon scanning a mine for the first time), you can take the mine. You must send a message after taking the mine and if the player responds within two minutes of the message, and would like the mine back, then the mine should be given back.')
    this.embed.addField('3.', 'If there are multiple players swarming, you can take the mine at zero if no response from earlier attempts at messaging the player.')

    return this.embed
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
