'use strict'

const AbstractCommand = require('./AbstractCommand')

class HelpCommand extends AbstractCommand {
  constructor () {
    super()
    this.title = 'Help | Commands'
    this.description = 'Any references to a \'player\' should be replaced with the target player name. ' +
      '\'id\' with the appopriate identifier.'
  }

  /**
   * @returns {module:"discord.js".RichEmbed}
   */
  get message () {
    this.headers()
    this.embed.addField(
      '```.help```',
      '- Invokes Help Command'
    )
    this.embed.addField(
      '```.citation search \'player\'```',
      '- Displays all citation related information for a user if they exist.'
    )
    this.embed.addField(
      '```.citation total \'player\'```',
      '- Displays total number of citations.'
    )
    this.embed.addField(
      '```.citation current \'player\'```',
      '- Displays most recent citation.'
    )
    this.embed.addField(
      '```.citation add \'player\' \'note\'```',
      '- Add citation to a player.'
    )
    this.embed.addField(
      '```.citation clear \'player\'```',
      '- Clears all citations from a player.'
    )
    this.embed.addField(
      '```.citation resolve \'player\' \'id\'```',
      '- Remove a citation from a player with \'id\'.'
    )

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

module.exports = HelpCommand
