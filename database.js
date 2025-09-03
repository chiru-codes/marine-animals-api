const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./marine.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS marine_animals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    species TEXT NOT NULL,
    habitat TEXT NOT NULL
  );`);
});

module.exports = db;
