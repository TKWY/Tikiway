const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/', (req, res) => {
  res.send('Customer infos')
});
// get
// post
// put
// delete

module.exports = router;