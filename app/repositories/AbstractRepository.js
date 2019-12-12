'use strict'

class AbstractRepository {
  constructor () {
    this.table = null
  }

  search () {}

  create () {}

  delete () {}

  new () {}

  assign (object, attributes) {
    return attributes !== undefined
      ? Object.assign(object, attributes)
      : null
  }
}

module.exports = AbstractRepository
