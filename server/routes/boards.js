var express = require('express');
var router = express.Router();

const prisma = require('../config/prisma');

// #index
router.get('/', async (req, res, next) => {
  try {
    const allBoards = await prisma.boards.findMany()

    res.json({ boards: allBoards })
  } catch (error) {
    console.error(error)
  }
});

// #show
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const board = await prisma.boards.findFirst({
      where: { id },
      include: {
        lanes: {
          include: {
            tasks: true,
            _count: {
              select: { tasks: true }
            }
          }
        }
      }
    });

    res.json({ board: board })
  } catch (error) {
    console.error(error)
  }
});

module.exports = router;
