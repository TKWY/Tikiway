const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {menuSchema} = require('./menuModels');
const {businessHoursSchema} = require('./businessHoursModels');

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
  logo: {
    type: String,
    default: 'default'
  },
  menu: [menuSchema],
  businessHours: [businessHoursSchema],
  businessHoursExceptions: [{
    type: String,
    name: String,
    date: Date,
    businessHours: [businessHoursSchema]
  }],
  address: {
    addressLine: {
      type: String,
      default: 'Restaurant'
    },
    lng: {
      type: Number,
      default: 0.00
    },
    lat: {
      type: Number,
      default: 0.00
    }
  }
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
