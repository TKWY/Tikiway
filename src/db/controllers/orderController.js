const Order = require('../models/orderModels');
const errorController = require('./errorController');

getOrder = async(req, res) => {
  try {
    const id = req.params.id
    const findOrder = await Order.findById(id);
    return res.status(200).json(findOrder);
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
};

getCustomerOrders = async(req, res) => {
  try {
    const id = req.params.id;
    const findOrders = await Order.find({customerId: id})
    return res.status(200).json(findOrders);
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
};

getRestaurantOrders = async(req, res) => {
  try {
    const id = req.params.restaurantId;
    const findOrders = await Order.find({restaurantId: id});
    return res.status(200).json(findOrders);
  } catch (err) {
    if (err) {
      const {status, message} = errorController(err);
      return res.status(status).json({message: message});
    }
  }
};

postOrder = async(req, res) => {
  try {
    const body = req.body;
    const newOrder = await new Order(body);
    await newOrder.save();
    return res.status(201).json({message: 'Order has been accepted'});
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
};

deleteOrder = async(req, res) => {
  try {
    const id = req.params.id;
    const findOrder = Order.findOneAndDelete(id);
    await findOrder;
    return res.sendStatus(204);
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
};

module.exports = {
  getOrder,
  getCustomerOrders,
  getRestaurantOrders,
  postOrder,
  deleteOrder
}
