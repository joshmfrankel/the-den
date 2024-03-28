var express = require('express');
var router = express.Router();

const db = require('../config/pg')

router.get('/', async (req, res, next) => {
  try {
    const tasks = await db.any(`
      SELECT *
      FROM tasks
    `)

    res.json({ tasks: tasks })
  } catch (error) {
    console.error(error)
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body: params } = req;

  try {
    const result = await db.none(`
      UPDATE tasks
      SET name = $1
      WHERE id = $2
    `, [params.name, id]
    )

    res.sendStatus(200)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router;
