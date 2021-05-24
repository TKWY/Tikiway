const express = require('express');
const router = express.Router();
const {
  getAllCustomers, 
  createCustomer, 
  customerSignIn, 
  customerSignOut, 
  getCustomersById, 
  updateCustomer,
  deleteCustomer
} = require('../db/controllers/customerController');

router.get('/', getAllCustomers);
router.post('/', createCustomer);
router.post('/signin', customerSignIn);
router.get('/signout', customerSignOut);
router.get('/:id', getCustomersById);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;