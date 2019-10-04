const Offender = require('./offender')

class Citation {
  constructor () {
    this.command = 'citation'
  }

  dispatch (args) {
    console.log(args)
  }
}

module.exports = Citation
