const app = require('../bootstrap/app')

const Offender = app.resolve('Offender')
const Citation = app.resolve('Citation')

let offender = Offender.search('Test')

if (!offender) {
  offender = Offender.add({ name: 'Test' })
}

Citation.add({ offender_id: offender.id, note: 'test test' })
