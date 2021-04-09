// Imports
const mongoose = require('mongoose');

// Local Imports
const config = require('../../config');

// Local variables

const DB_URI = config.db;

// Connect to database
connect = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      const Mockgoose = require('mockgoose').Mockgoose;
      const mockgoose = new Mockgoose(mongoose);
      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
          })
            .then((res, err) => {
              if (err) reject(err); // throw unneeded errors
              resolve()
            })
        })
    } else {
      // MongoDB connect and options
      mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
        .then((res, err) => {
          if (err) reject(err); // throw unneeded errors
          resolve()
        })
    }
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
