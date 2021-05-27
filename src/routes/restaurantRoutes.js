const express = require('express');
const router = express.Router();
const {
  getAllRestaurant, 
  getRestaurantById, 
  postRestaurant,
  deleteRestaurant
} = require('../db/controllers/restaurantController');
const {
  postMenu, 
  getAllMenu
} = require('../db/controllers/menuController');

// Restaurant routes
router.get('/', getAllRestaurant)
router.post('/', postRestaurant)

// Restaurant operations with ID
router.get('/:restaurantId', getRestaurantById)
router.delete('/:restaurantId', deleteRestaurant)

// Menu routes
router
  .get('/:restaurantId/menu', getAllMenu)
  .post('/:restaurantId/menu', postMenu)
  .get('/:restaurantId/menu/:id', (req, res) => {
    res.send(console.log(`this is menu id ${req.params.id }`))
  })

// Dish routes
router
  .get('/:restaurantId/menu/:id/dish', (req, res) => {
    res.send(console.log('this is a menu'))
  })
  .post('/:restaurantId/menu/:id/dish', (req, res) => {
    res.send(console.log('this is a menu'))
  })

module.exports = router;