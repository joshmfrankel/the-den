var express = require('express');
var router = express.Router();

const pgOptions = {}
const pgp = require('pg-promise')(pgOptions)
const pgConfig = {
  host: 'localhost',
  port: 5432,
  database: "the_den_db",
  user: "josh",
  password: "postgres"
}
const db = pgp(pgConfig)

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const todos = await db.any('SELECT * FROM todos')

    res.render('index', { title: 'Todos', todos })
  } catch (error) {
    console.error(error)
  }
});

module.exports = router;
