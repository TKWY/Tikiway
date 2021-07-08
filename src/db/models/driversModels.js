const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const driverSchema = new Schema({
  phone: {
    type: String,
    required: true,
    unique: true
  },
  mail: {
    type: String,
    required: true,
    unique: true
  },
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
  workingStatus: {
    type: Boolean,
    default: false,
    required: true
  },
  accountValidation: {
    type: Boolean,
    default: false,
    required: true
  }
});

driverSchema.pre('save', function save(next) {
  const driver = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(driver.password, salt, function(err, hash) {
      if (err) return next (err);
      driver.password = hash;
      next()
    })
  })
});

driverSchema.methods.comparePassword = function(candidatePassword, cb) {
  const driver = this;
  bcrypt.compare(candidatePassword, driver.password, function(err, Ismatch) {
    if (err) return cb(err);
    cb(null, driver);
  })
};

const Drivers = mongoose.model('Drivers', driverSchema);
module.exports = Drivers;