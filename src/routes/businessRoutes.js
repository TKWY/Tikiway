const express = require('express');
const Router = express.Router();

const businessController = require('../db/controllers/businessHoursController');

Router.get('/restaurantId/hours', businessController.getHours);

module.exports = Router;