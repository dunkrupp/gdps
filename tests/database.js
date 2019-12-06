const app = require('../bootstrap/app')

const Offender = app.resolve('Offender')
const Citation = app.resolve('Citation')

let offender = Offender.search('afasdff')

console.log(offender)

if (!offender) {
  Offender.add({ name: 'afasdff' })
}

Citation.add({ offender_id: offender.id, note: 'test test' })
