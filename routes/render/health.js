const express = require('express')
const router = express.Router()

// @todo Add db check or other app sanity check
router.get('/', (request, response) => {
  response.sendStatus(200)
})

module.exports = router;
