const mongoose = require('mongoose');
const schema = mongoose.Schema;
const itemsSchema = require('./itemModel');

const modifierSchema = new schema({
  name: {
    type: String,
    required: true
  },
  items: [itemsSchema]
});

module.exports = modifierSchema;