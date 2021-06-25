const express = require('express');
const router = express.Router();
const cart = require('../db/controllers/cartController');

router.post('/', cart.addDishToCart);

module.export = router;