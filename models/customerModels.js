const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: { type: String },
  phone: { 
    type: String ,
    required: true
  },
  dateOfBirth: { type: Date },
  profileImage: { type: String },
})

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;