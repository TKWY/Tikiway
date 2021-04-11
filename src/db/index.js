// Imports
const mongoose = require('mongoose');

// Local Imports
const config = require('../../config');

// Local variables
const DB_URI = config.db;

// Connect to database
connect = () => {
  return new Promise((resolve, reject) => {
    // MongoDB connect and options
    mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
      .then((res, err) => {
        if (err) reject(err); // throw unneeded errors
        resolve()
      })
  })
};

// Close connection to database
close = () => {
  return mongoose.disconnect();
}

// Export functions
module.exports = {
  connect,
  close
}
