const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverSchema = new Schema({
  tel: {
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
    default: false
  }
})

const Drivers = mongoose.model('Drivers', driverSchema);

module.exports = Drivers;