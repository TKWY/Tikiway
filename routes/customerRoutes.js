// Imports
const express = require('express');
const router = express.Router();


// Local imports
const customerController = require('../controllers/customerController');

router.get('/', (req) => {customerController.getAllCustomers(req)});
router.post('/create', customerController.createCustomer);
router.post('/login', customerController.customerSignIn)
/*router.post('/login', (req, res) => {
  if (req.session.authenticated) {
    console.log('already connected')
  } else {
    customerController.customerSignIn(req)
  }
});*/
router.get('/:id', customerController.getAllCustomers);
router.put('/:id', customerController.updateCustomer)

module.exports = router;
