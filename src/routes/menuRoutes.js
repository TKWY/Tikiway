const express = require('express');
const router = express.Router();
const menus = require('../db/controllers/menuController');
const dishRoutes = require('./dishRoutes');

router.use('/', dishRoutes);
router.get('/:restaurantId/menu', menus.getAllMenu);
router.post('/:restaurantId/menu', menus.postMenu);
router.get('/:restaurantId/menu/:menuId', menus.getMenuById);
router.put('/:restaurantId/menu/:menuId', menus.updateMenu);
router.delete('/:restaurantId/menu/:menuId', menus.deleteMenu);

module.exports = router;