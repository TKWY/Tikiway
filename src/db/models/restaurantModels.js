const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {menuSchema} = require('./menuModels');
const {businessHoursSchema} = require('./businessHoursModels');
const {reviewsSchema} = require('./reviewsModels');

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
  reviews: [reviewsSchema],
  address: {
    addressLine: String,
    lng: Number,
    lat: Number
  }
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = {
  Restaurant
};