const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const lodash = require('lodash');
const items = require('./itemModel');
const orderSchema = new Schema({
  restaurantId: {
    type: String,
    required: true
  },
  items: {
    type: items,
    default: () => ({})
  },
  total: {
    type: Number,
    default: 0
  },
  orderStatus: {
    type: String,
    enum: ["IN_PROGRESS", "RESTAURANT_ACCEPTED", "DRIVER_ACCEPTED", "DONE"],
    default: "IN_PROGRESS"
  },
  invoiceStatus: {
    type: String,
    enum: ["UNPAID", "PAID"],
    default: "UNPAID"
  }
});

orderSchema.pre('save', function save(next) {
  const order = this;
  const dishes = [];
  for (const item in order.items) {
    dishes.push(item.price*item.quantity)
  }
  order.total = lodash.sum(dishes);
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
