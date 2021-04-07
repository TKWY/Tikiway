const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// Customers Schema
const customerSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Enter your firstname.']
  },
  lastName: {
    type: String,
    required: [true, 'Enter your lastname.']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email is already used.'],
    index: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String ,
    required: [true, 'Phone number is required.'],
    unique: [true, 'That phone number is already used.'],
    index: true,
    maxlength: [12, 'Phone number must have 12 characters.']
  },
  dateOfBirth: { type: Date },
  profileImage: { type: String },
});

customerSchema.pre('save', function save(next) {
  const customer = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err)
    bcrypt.hash(customer.password, salt, function (err, hash) {
      console.log(customer.password)
      if (err) return next(err)
      customer.password = hash;
      next()
    })
  })
});

customerSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, IsMatch) {
    if (err) return cb(err);
    cb(null, IsMatch);
  })
}

// Export
const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
