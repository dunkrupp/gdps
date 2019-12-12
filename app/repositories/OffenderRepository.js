'use strict'

const AbstractRepository = require('./AbstractRepository')
const Database = require('../Database')
const Offender = require('../models/Offender')

class OffenderRepository extends AbstractRepository {
  constructor () {
    super()
    this.table = 'offenders'
    this.connection = new Database({ table: this.table })
  }

  /**
   * @param value
   * @param column
   * @returns {*}
   */
  search (value, column = 'name') {
    return this.assign(
      new Offender(),
      this.connection.where(column, value)
    )
  }

  /**
   * @param attributes
   * @returns {attributes}
   */
  create (attributes) {
    return this.assign(
      new Offender(),
      this.connection.create(attributes)
    )
  }

  /**
   * @param id
   * @returns {*}
   */
  delete (id) {
    return this.connection.delete(id)
  }

  /**
   * @param attributes
   * @returns {Offender}
   */
  new (attributes = {}) {
    return new Offender()
  }
}

module.exports = OffenderRepository
