const express = require('express');
const router = express.Router();
const restaurants = require('../db/controllers/restaurantController');
const menuRoutes = require('./menuRoutes')

router.use('/', menuRoutes);
router.get('/', restaurants.getAllRestaurant);
router.post('/', restaurants.postRestaurant);
router.get('/:restaurantId', restaurants.getRestaurantById);
router.put('/:restaurantId', restaurants.updateRestaurant);
router.delete('/:restaurantId', restaurants.deleteRestaurant);

module.exports = router;