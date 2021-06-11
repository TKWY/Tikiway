const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modifierSchema = require('./modifierModels');

const dishSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  modifier: [modifierSchema],
  price: {
    type: Number,
    required: true
  },
  promoPrice: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: 'default'
  },
  restaurantId: {
    type: String,
    required: true
  },
  menuId: {
    type: String,
    required: true
  }
});

const Dish = mongoose.model('Dish', dishSchema);
module.exports = {
  Dish,
  dishSchema
};