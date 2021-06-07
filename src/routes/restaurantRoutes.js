const express = require('express');
const router = express.Router();
const restaurants = require('../db/controllers/restaurantController');
const menus = require('../db/controllers/menuController');
const dishes = require('../db/controllers/dishesController');

// Restaurant routes
router.get('/', restaurants.getAllRestaurant);
router.post('/', restaurants.postRestaurant);
router.get('/:restaurantId', restaurants.getRestaurantById);
router.put('/:restaurantId', restaurants.updateRestaurant);
router.delete('/:restaurantId', restaurants.deleteRestaurant);

// Menu routes
router.get('/:restaurantId/menu', menus.getAllMenu);
router.post('/:restaurantId/menu', menus.postMenu);
router.get('/:restaurantId/menu/:menuId', menus.getMenuById);
router.put('/:restaurantId/menu/:menuId', menus.updateMenu);
router.delete('/:restaurantId/menu/:menuId', menus.deleteMenu);

// Dish routes
router.post('/:restaurantId/menu/:menuId/dish', dishes.postDish);
router.get('/:restaurantId/menu/:menuId/dish', dishes.getDishes);
router.get('/:restaurantId/menu/:menuId/dish/:dishId', dishes.getDishById);
router.put('/:restaurantId/menu/:menuId/dish/:dishId', dishes.updateDish);
router.delete('/:restaurantId/menu/:menuId/dish/:dishId', dishes.deleteDish);

module.exports = router;