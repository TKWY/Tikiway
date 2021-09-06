const express = require('express');
const router = express.Router();
const customerController = require('../db/controllers/customerController');
const orderController = require('../db/controllers/orderController');

router.get('/', customerController.getAllCustomers);
router.post('/', customerController.createCustomer);
router.get('/:id', customerController.getCustomersById);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);
router.get('/:id/orders', orderController.getCustomerOrders);

module.exports = router;
