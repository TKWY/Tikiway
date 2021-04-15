const mongoose = require('mongoose');
const {db} = require('../../config');

connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
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
