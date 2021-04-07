// Imports
const mongoose = require('mongoose');

// Local Imports
const config = require('../../config');

// Local variables
const DB_URI = `mongodb+srv://${config.db.user}:${config.db.password}@${config.db.cluster}/${config.db.document}?retryWrites=true&w=majority`;

// Connect to database
connect = () => {
  return new Promise((resolve, reject) => {
    // MongoDB connect and options
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then((res, err) => {
        if (err) throw err; // throw unneeded errors
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
