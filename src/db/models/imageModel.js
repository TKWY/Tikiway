const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    default: 'default'
  },
  description: {
    type: String
  }
});

module.exports = imageSchema;
