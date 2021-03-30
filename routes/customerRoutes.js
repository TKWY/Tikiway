const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/all', customerController.get_all_customers);
router.post('/signup', customerController.create_customer);
router.post('/signin', customerController.customer_signin);
// get
// post
// put
// delete

module.exports = router;