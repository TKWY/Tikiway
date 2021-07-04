const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('You hit the driver route')
});

module.exports = router;