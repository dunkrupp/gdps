const app = require('../app/autoload')
const Help = new app.Help()
const Bot = new app.Bot()
const Citation = new app.Citation()
const Offender = new app.Offender()
const Roe = new app.Roe()

console.log('App container is loaded... ')
console.log(typeof app === 'object')

console.log('Help is instantiated... ')
console.log(typeof Help === 'object')

console.log('Help is instantiated... ')
console.log(typeof Bot === 'object')

console.log('Help is instantiated... ')
console.log(typeof Citation === 'object')

console.log('Help is instantiated... ')
console.log(typeof Offender === 'object')

console.log('Help is instantiated... ')
console.log(typeof Help === 'object')

console.log('Help is instantiated... ')
console.log(typeof Roe === 'object')