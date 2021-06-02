const express = require('express');
const router = express.Router();
const {
  getAllRestaurant, 
  getRestaurantById, 
  postRestaurant,
  deleteRestaurant,
  updateRestaurant
} = require('../db/controllers/restaurantController');
const {
  postMenu, 
  getAllMenu,
  getMenuById
} = require('../db/controllers/menuController');
const { 
  postDish
} = require('../db/controllers/dishesController');

// Restaurant routes
router.get('/', getAllRestaurant);
router.post('/', postRestaurant);

// Restaurant operations with ID
router.get('/:restaurantId', getRestaurantById);
router.delete('/:restaurantId', deleteRestaurant);
router.put('/:restaurantId', updateRestaurant);

// Menu routes
router.get('/:restaurantId/menu', getAllMenu);
router.post('/:restaurantId/menu', postMenu);
router.get('/:restaurantId/menu/:menuId', getMenuById);

// Dish routes
router.post('/:restaurantId/menu/:menuId/dish', postDish);

router.get('/:restaurantId/menu/:menuId/dish', (req, res) => {
    res.send(console.log('this is a menu'))
  });

module.exports = router;