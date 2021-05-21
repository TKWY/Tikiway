const express = require('express');
const router = express.Router();
const { 
  getAllRestaurant, 
  getRestaurantById,
  postRestaurant
} = require('../db/controllers/restaurantController');
const {
  postMenu
} = require('../db/controllers/menuController')
// Restaurant routes
router
  .get('/', getAllRestaurant)
  .post('/', postRestaurant)

router
  .get('/:id', getRestaurantById)


// Menu routes
router
  .get('/:id/menu', (req, res) => {
    res.send(console.log('this is a menu'))
  })
  .post('/:id/menu', postMenu)
  .get('/:id/menu/:id', (req, res) => {
    res.send(console.log(`this is menu id ${req.params.id }`))
  })

// Dish routes
router
  .get('/:id/menu/:id/dish', (req, res) => {
    res.send(console.log('this is a menu'))
  })
  .post('/:id/menu/:id/dish', (req, res) => {
    res.send(console.log('this is a menu'))
  })

module.exports = router;