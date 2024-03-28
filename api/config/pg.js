const pgOptions = {}
const pgp = require('pg-promise')(pgOptions)
const pgConfig = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DB,
  user: process.env.PG_USER,
  password: process.env.PG_PASS
}
const db = pgp(pgConfig)

async function checkConnection() {
  try {
    await db.any('SELECT * FROM pg_stat_activity LIMIT 1')
    console.log('Database connected')
  } catch (error) {
    console.error('Database connection failure: ', error)
  }
}

checkConnection();

module.exports = db;
