const express = require('express');
const router = express.Router();
const { getAllRestaurant } = require('../db/controllers/restaurantController');

router.get('/', getAllRestaurant);

module.exports = router;