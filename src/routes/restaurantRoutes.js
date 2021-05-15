const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
  return res.status(200).json({
    code: 200,
    success: true,
    restaurants: []
  })
});

router.get('/:id', (req, res) => {
  res.status(200).send('this is the id')
});

module.exports = router;