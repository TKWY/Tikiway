const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const saltRounds = 10;

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
    required: true,
    unique: [true, 'That phone number is already used.'],
    index: true,
    maxlength: 10
  },
  dateOfBirth: { type: Date },
  profileImage: { type: String },
});


const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;