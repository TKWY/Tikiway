const express = require('express');
const router = express.Router();
const cart = require('../db/controllers/cartController');

router.get('/', cart.fetchCart);
router.post('/', cart.addCart);
router.put('/', cart.updateCart);

module.exports = router;