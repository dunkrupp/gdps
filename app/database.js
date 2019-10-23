'use strict'

const Sqlite = require('better-sqlite3')
const path = require('path')
const dbPath = path.join(__dirname, '/../database/gdps.db')

class Database {
  /**
   * @param opts
   */
  constructor (opts) {
    this._db = null
    this._rows = []
    this._attributes = {}
    this._table = (opts !== undefined && 'table' in opts) ? opts.table : ''
    this.connect()
  }

  /**
   * @returns {*}
   */
  get attributes () {
    return this._attributes
  }

  /**
   * @param attributes
   */
  set attributes (attributes) {
    this._attributes = attributes
  }

  /**
   * @returns {array}
   */
  get columns () {
    return Object.keys(this._attributes)
  }

  /**
   * @returns {array}
   */
  get values () {
    return Object.values(this._attributes)
  }

  /**
   * @returns {string}
   */
  get binds () {
    return [...Array(this.values.length)].map(i => '?').join(',')
  }

  /**
   * @returns {*|string}
   */
  get table () {
    return this._table
  }

  /**
   * @param table
   */
  set table (table) {
    this._table = table
  }

  /**
   * Sets the database connection
   */
  connect () {
    this._db = new Sqlite(dbPath, { verbose: console.log })
  }

  /**
   * Closes the connection
   */
  disconnect () {
    this._db.close()
  }

  /**
   *
   * @param attributes
   * @returns {boolean|*}
   */
  create (attributes) {
    this.attributes = attributes

    const statement = this.build(
      `INSERT INTO ${this.table} (${this.columns.join(',')}) VALUES (${this.binds});`
    )

    return statement.run(this.values)
  }

  /**
   * @param value
   * @param column
   * @returns {*}
   */
  delete (value, column = 'id') {
    const statement = this.build(
      `DELETE FROM ${this.table} WHERE ${column} = ?;`
    )

    return statement.run([value])
  }

  /**
   * @param column
   * @param value
   * @param operator
   * @returns {*}
   */
  where (column, value, operator = '=') {
    const statement = this.build(
      `SELECT * FROM ${this.table} WHERE ${column} ${operator} ?;`
    )

    return statement.get(value)
  }

  /**
   * @returns {Promise<[*]>}
   */
  all () {
    const statement = this.build(
      'SELECT * FROM $table;'
    )

    return statement.all()
  }

  /**
   * @param statement
   */
  build (statement) {
    console.log(statement)
    statement = this._db.prepare(statement)
    return statement
  }

  /**
   * Clears all Attributes and Rows
   */
  clear () {
    this._attributes = []
    this._rows = []
  }
}

module.exports = Database
