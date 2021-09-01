const Order = require('../models/orderModels');

getOrder = (req, res) => {
  res.status(200).json('This is the get order method');
};

getOrderById = (req, res) => {
  res.status(200).json('This is the get order id method');
};

updateOrder = (req, res) => {
  res.status(201).json('This is the update order method');
};

deleteOrder = (req, res) => {
  res.statusCode(204);
};

module.exports = {
  getOrder,
  getOrderById,
  updateOrder,
  deleteOrder
};