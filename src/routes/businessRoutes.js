const express = require('express');
const Router = express.Router();

const businessController = require('../db/controllers/businessHoursController');

Router.get('/:restaurantId/hours', businessController.getHours);
Router.post('/:restaurantId/business', businessController.postBusinessHours);
Router.post('/:restaurantId/exception', businessController.postException)

module.exports = Router;