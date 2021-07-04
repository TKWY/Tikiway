const express = require('express');
const router = express.Router();
const cart = require('../db/controllers/cartController');

router.get('/', (req, res) =>  {
  console.log('this is the cart get')
})
router.post('/', cart.addDishToCart);

module.exports = router;