const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.get_all_customers);
router.post('/signup', customerController.create_customer);
router.post('/signin', customerController.customer_signin);
router.get('/:id', customerController.get_customers_by_id);
router.put('/:id', customerController.update_customer)


module.exports = router;