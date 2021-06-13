const mongoose = require('mongoose');
const schema = mongoose.Schema;

const itemsSchema = new schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number
  }
});

module.exports = itemsSchema;