var express = require('express');
var router = express.Router();

const db = require('../config/pg');
const prisma = require('../config/prisma');

router.get('/', async (req, res, next) => {
  try {
    const allTasks = await prisma.tasks.findMany();

    res.json({ tasks: allTasks })
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
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.none(`
      DELETE FROM tasks
      WHERE id = $1
    `, [id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
})

module.exports = router;
