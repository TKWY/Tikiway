const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {menuSchema} = require('./menuModels');
const {businessHoursSchema} = require('./businessHoursModels');
const geoLocSchema = require('./geolocModels');
const imageSchema = require('./imageModel');

const restaurantSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description:  {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  category: String,
  logo: imageSchema,
  menu: [menuSchema],
  businessHours: [businessHoursSchema],
  businessHoursExceptions: [{
    type: String,
    name: String,
    date: Date,
    businessHours: [businessHoursSchema]
  }],
  address: {
    type: [geoLocSchema],
    default: () => ({})
  }
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
