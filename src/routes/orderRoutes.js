const express = require('express');
const Router = express.Router();

Router.get('/order', (req, res) => {
  res.status(200).json('This is the order route')
});

module.exports = Router;
