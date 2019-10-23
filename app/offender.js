'use strict'

const Database = require('./database')

class Offender {
  constructor () {
    this.command = 'offender'
    this.table = 'offenders'
    this.connection = new Database({ table: this.table })
  }

  create () {
    this.connection.create(

    )
  }

  find () {
    this.connection.find(

    )
  }
}

module.exports = Offender
