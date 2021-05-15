const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessHoursSchema = new Schema({
  slotName: String,
  monday: {
    start: String, 
    end: String
  },
  tuesday: {
    start: String, 
    end: String
  },
  wednesday: {
    start: String, 
    end: String
  },
  thursday: {
    start: String, 
    end: String
  },
  friday: {
    start: String, 
    end: String
  },
  saturday: {
    start: String, 
    end: String
  },
  sunday: {
    start: String, 
    end: String
  }
})

const reviewsSchema = new Schema({
  orderId: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  writer: {
    type: String,
    required: true
  },
  comment: String,
  tags: [{
    label: String
  }],
  likes: [{
    clientId: String, 
    date: Date
  }],
  shares: [{
    clientId: String, 
    plateform: String, 
    date: Date
  }]
})

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
  rating: Number,
  category: String,
  logo: String,
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
module.exports = Restaurant