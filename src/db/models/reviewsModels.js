const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  Shares: [{
    clientId: String,
    plateform: String,
    date: Date
  }]          
})

const Reviews = mongoose.model('Reviews', reviewsSchema);
module.exports = {
  Reviews,
  reviewsSchema
};