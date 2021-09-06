// Regular imports
const express = require('express');
const router = express.Router();
const restaurants = require('../db/controllers/restaurantController');
const ordersController = require('../db/controllers/orderController');

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

// Order routes endpoints return list of orders
router.get('/:restaurantId/orders', ordersController.getRestaurantOrders);

// Address routes endpoints
router.get('/:restaurantId/loc', restaurants.getLocation);
router.post('/:restaurantId/loc', restaurants.postLocation);
router.put('/:restaurantId/loc/:locId', restaurants.updateLocation);
router.delete('/:restaurantId/loc/:locId', restaurants.deleteLocation);

module.exports = router;
