const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.getAllCustomers);
router.post('/signup', customerController.createCustomer);
router.post('/signin', customerController.customerSignin);
router.get('/:id', customerController.getAllCustomers);
router.put('/:id', customerController.updateCustomer)

module.exports = router;