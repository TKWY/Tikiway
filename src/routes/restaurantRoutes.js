// Regular imports
const express = require('express');
const router = express.Router();
const restaurants = require('../db/controllers/restaurantController');

// Other routes imports.
const menuRoutes = require('./menuRoutes');
const businessRoutes = require('./businessRoutes');

// Other routes endpoints.
router.use('/', menuRoutes);
router.use('/', businessRoutes);

// Restaurants routes endpoints.
router.get('/', restaurants.getAllRestaurant);
router.post('/', restaurants.postRestaurant);

// Restaurants target ID endpoints.
router.get('/:restaurantId', restaurants.getRestaurantById);
router.put('/:restaurantId', restaurants.updateRestaurant);
router.delete('/:restaurantId', restaurants.deleteRestaurant);

module.exports = router;