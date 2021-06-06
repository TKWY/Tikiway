const express = require('express');
const router = express.Router();
const restaurants = require('../db/controllers/restaurantController');
const menus = require('../db/controllers/menuController');
const dishes = require('../db/controllers/dishesController');

// Restaurant routes
router.get('/', restaurants.getAllRestaurant);
router.post('/', restaurants.postRestaurant);

// Restaurant operations with ID
router.get('/:restaurantId', restaurants.getRestaurantById);
router.delete('/:restaurantId', restaurants.deleteRestaurant);
router.put('/:restaurantId', restaurants.updateRestaurant);

// Menu routes
router.get('/:restaurantId/menu', menus.getAllMenu);
router.post('/:restaurantId/menu', menus.postMenu);
router.get('/:restaurantId/menu/:menuId', menus.getMenuById);

// Dish routes
router.post('/:restaurantId/menu/:menuId/dish', dishes.postDish);
router.get('/:restaurantId/menu/:menuId/dish', dishes.getDishes);
router.get('/:restaurantId/menu/:menuId/dish/:dishId', dishes.getDishById)

module.exports = router;