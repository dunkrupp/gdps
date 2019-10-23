const Database = require('../app/database')
const db = new Database()

const random = [...Array(10)].map(i => (~~(Math.random() * 36)).toString(36)).join('')

db.table = 'offenders'
const row = db.create({ name: random, alliance: 'GDPS' })

db.table = 'citations'
db.create({ offender_id: row.lastInsertRowid, note: 'Broke ROE Rule D Issues' })
db.where('offender_id', 1)

db.delete(row.lastInsertRowid, 'offender_id')
