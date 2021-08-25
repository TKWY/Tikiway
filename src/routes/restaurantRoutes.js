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
// test if modifications wouldn't be better with patch instead of put
router.get('/:restaurantId', restaurants.getRestaurantById);
router.put('/:restaurantId', restaurants.updateRestaurant);
router.delete('/:restaurantId', restaurants.deleteRestaurant);

// Address routes endpoints
router.get('/:restaurantId/loc', restaurants.getLocation);

module.exports = router;
