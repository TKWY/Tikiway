const mongoose = require('mongoose');
const {db} = require('../../config');

connect = () => {
  return new Promise((resolve, reject) => {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
    mongoose.connect(db, options)
      .then((res, err) => {
        if (err) reject(err);
        resolve()
      })
  })
};

close = () => {
  return mongoose.disconnect()
};

module.exports = {connect, close}
