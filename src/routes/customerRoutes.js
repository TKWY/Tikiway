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
router.get('/:id', getCustomersById);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;