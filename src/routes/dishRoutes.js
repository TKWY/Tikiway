const express = require('express');
const router = express.Router();
const dishes = require('../db/controllers/dishesController');

router.post('/:restaurantId/menu/:menuId/dish', dishes.postDish);
router.get('/:restaurantId/menu/:menuId/dish', dishes.getDishes);
router.get('/:restaurantId/menu/:menuId/dish/:dishId', dishes.getDishById);
router.put('/:restaurantId/menu/:menuId/dish/:dishId', dishes.updateDish);
router.delete('/:restaurantId/menu/:menuId/dish/:dishId', dishes.deleteDish);

module.exports = router;