const Customer = require('../models/customerModel')
// handle customers operation
// get user
// signin
// checksignin
// check password
// encrypt password
// get orders
// get past orders
// get futur orders

const create_customer = (req, res) => {
  const customer = new Customer(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
};

module.exports = {
  create_customer
}