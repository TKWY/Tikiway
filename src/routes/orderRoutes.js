const express = require('express');
const Router = express.Router();
const orderController = require('../db/controllers/orderController');

<<<<<<< HEAD
Router.post('/', orderController.postOrder);
Router.get('/:id', orderController.getOrder);
Router.delete('/:id', orderController.deleteOrder);
=======
Router.get('/order', orderController.getOrder);
Router.get('/order/:orderId', orderController.getOrderById);
Router.put('/order/:orderId', orderController.updateOrder);
Router.delete('/order/:orderId', orderController.deleteOrder);
>>>>>>> c051eeb40a76aee90d289d3f094e9d026797849a

module.exports = Router;
