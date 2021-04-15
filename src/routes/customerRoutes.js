const express = require('express');
const router = express.Router();

const {
  getAllCustomers, createCustomer, customerSignIn, customerSignOut, getCustomersById, updateCustomer
} = require('../db/controllers/customerController');

router.get('/', getAllCustomers);
router.post('/signup', createCustomer);
router.post('/signin', customerSignIn);
router.get('/signout', customerSignOut);
router.get('/:id', getCustomersById);
router.put('/:id', updateCustomer);

module.exports = router;
