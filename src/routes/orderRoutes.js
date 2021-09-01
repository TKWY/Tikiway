const express = require('express');
const Router = express.Router();
const orderController = require('../db/controllers/orderController');

Router.get('/order', orderController.getOrder);
Router.get('/order/:orderId', orderController.getOrderById);
Router.put('/order/:orderId', orderController.updateOrder);
Router.delete('/order/:orderId', orderController.deleteOrder);

module.exports = Router;
