const express = require('express');
const router = express.Router();
const {
  getAllCustomers, 
  createCustomer, 
  getCustomersById, 
  updateCustomer,
  deleteCustomer
} = require('../db/controllers/customerController');

router.get('/', getAllCustomers);
router.post('/', createCustomer);
router.get('/:customerId', getCustomersById);
router.put('/:customerId', updateCustomer);
router.delete('/:customerId', deleteCustomer);

module.exports = router;