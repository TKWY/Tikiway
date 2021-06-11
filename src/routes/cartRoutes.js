const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {{
  console.log('This is the post route')
}})

module.export = router;