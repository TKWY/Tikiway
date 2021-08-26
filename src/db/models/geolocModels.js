const mongoose = require('mongoose');
const Schema = mongoose.Schema
const coordinate = require('./coordinateModels');

const geoLocSchema = new Schema({
  addressName: {
    type: String,
    default: 'Current Position'
  },
  coordinates: {
    type: coordinate,
    default: () => ({})
  },
  formattedAddress: String,
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = geoLocSchema;
