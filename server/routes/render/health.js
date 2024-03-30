const express = require('express')
const router = express.Router()

// @todo Verify database or other sanity check
router.get('/', (request, response) => {
  response.sendStatus(200)
})

module.exports = router;
