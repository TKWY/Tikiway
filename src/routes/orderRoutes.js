const express = require('express');
const Router = express.Router();
const orderController = require('../db/controllers/orderController');

Router.post('/', orderController.postOrder);
Router.get('/:id', orderController.getOrder);
Router.delete('/:id', orderController.deleteOrder);

module.exports = Router;
