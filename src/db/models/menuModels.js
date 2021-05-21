const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {dishSchema} = require('./dishesModels');

const menuSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  restaurantId: {
    type: String,
    required: true
  },
  dishes:[dishSchema]
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = {
  Menu,
  menuSchema
};