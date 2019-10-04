module.exports = {
  /** Export Classes */
  Bot: require('../app/bot'),
  Citation: require('../app/citation'),
  Offender: require('../app/offender'),
  Help: require('../app/help'),
  Roe: require('../app/roe'),

  /** Export Methods */
  dispatch: function (object) {
    return object.message
  }
}