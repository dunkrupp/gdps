'use strict'

const Offender = require('./offender')
const Database = require('./database')

class Citation {
  constructor () {
    this.command = 'citation'
    this.table = 'citations'
    this.connection = new Database({ table: this.table })
  }

  dispatch (args) {
    /*
    * 1. Get Action
    * 2. Run Action
    * 3. Cleanup
    */

    console.log(args)
    return null
  }

  create () {
    this.connection.create(

    )
  }

  find () {
    this.connection.find(

    )
  }

  run (comment) {
    // Do logic
    return 'test citation'
  }
}

module.exports = Citation
