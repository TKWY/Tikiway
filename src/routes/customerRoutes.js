const express = require('express');
const router = express.Router();

const {
  getAllCustomers, createCustomer, customerSignIn, customerSignOut, getCustomersById, updateCustomer
} = require('../db/controllers/customerController');

router
  .get('/', getAllCustomers)
  .post('/', createCustomer)
  .post('/signin', customerSignIn)
  .get('/signout', customerSignOut)
  .get('/:id', getCustomersById)
  .put('/:id', updateCustomer);

module.exports = router;
