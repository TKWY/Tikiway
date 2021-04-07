// Imports
const express = require('express');
const router = express.Router();

// Local imports
const customerController = require('../db/controllers/customerController');

// Customer API http request:
// Route to all customers
// Argument type error on IDE, must refactor all routes
router.get('/', customerController.getAllCustomers);

// Route to create customer
router.post('/signup', customerController.createCustomer);

// Route to customer login
router.post('/signin', customerController.customerSignIn);

// Route to customer by ID
router.get('/:id',customerController.getCustomersById);

// Route to update customer information with their ID
router.put('/:id', customerController.updateCustomer);

module.exports = router;
