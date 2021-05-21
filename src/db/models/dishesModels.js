const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
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
  }
});

const Dish = mongoose.model('Dish', dishSchema);
module.exports = {
  Dish,
  dishSchema
};