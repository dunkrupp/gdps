'use strict'

/* Set DB Path */
const path = require('path')
const dbPath = path.join(__dirname, '/../database/gdps.db')

/* Create DB if it doesn't exist */
const fs = require('fs')

fs.access(dbPath, error => {
  if (!error) {
    // continue
  } else {
    fs.closeSync(
      fs.openSync(dbPath, 'w')
    )
  }
})

/* Install Schema */
const Sqlite = require('better-sqlite3')
const db = new Sqlite(dbPath, { verbose: console.log })

db.prepare(`CREATE TABLE IF NOT EXISTS offenders (
     id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
     name text NOT NULL UNIQUE,
     alliance text DEFAULT NULL,
     created_at datetime NOT NULL DEFAULT current_timestamp,
     updated_at datetime NOT NULL DEFAULT current_timestamp,
     deleted_at datetime);`
).run()

db.prepare(`CREATE TABLE IF NOT EXISTS citations (
   id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
   offender_id integer NOT NULL,
   note text DEFAULT NULL,
   created_at datetime NOT NULL DEFAULT current_timestamp,
   updated_at datetime NOT NULL DEFAULT current_timestamp,
   deleted_at datetime,
   FOREIGN KEY (offender_id)
   REFERENCES offenders (id)
   ON DELETE CASCADE
   ON UPDATE NO ACTION);`
).run()

db.prepare(`CREATE TRIGGER tg_offenders_updated_at
   AFTER UPDATE
   ON offenders FOR EACH ROW
   BEGIN
   UPDATE offenders SET updated_at = current_timestamp
   WHERE id = old.id;
   END;`
).run()

db.prepare(`CREATE TRIGGER tg_citations_updated_at
   AFTER UPDATE
   ON citations FOR EACH ROW
   BEGIN
   UPDATE citations SET updated_at = current_timestamp
   WHERE id = old.id;
   END;`
).run()

db.prepare('select * from offenders;').all()
