const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coordinateSchema = new Schema({
  _id: false,
  lat: {
    type: Number,
    default: 0.00
  },
  lng: {
    type: Number,
    default: 0.00
  }
});

module.exports = coordinateSchema;
