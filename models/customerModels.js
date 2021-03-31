const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  firstName: {
    type: String,
    required: [true, {error: 'Enter your firstname'}]
  },
  lastName: {
    type: String,
    required: [true, 'Enter your lastname']
  },
  password: {
    type: String,
    required: [true, 'Enter your password']
  },
  email: { type: String },
  phone: { 
    type: String ,
    required: true,
    unique: [true, 'That phone number is already used.'],
    index: true,
    maxlength: [12, 'Phone number must have 12 characters']
  },
  dateOfBirth: { type: Date },
  profileImage: { type: String },
});

customerSchema.pre('save', async function save(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
  next()
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;