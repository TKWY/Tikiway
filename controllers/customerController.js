const Customer = require('../models/customerModels');
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
  if (!Customer.find(req.phone)) {
    const newCustomer = new Customer(req.body)
    newCustomer.save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      }) 
  } else {
    res.status(409).send('User Already Exits! Login or enter another phone number');
  };
};

const customer_signin = (req, res) => {
  if (!req.body.phone || !req.body.password) {
    res.status(401).send('Please enter your phone number and password');
  } else {
    Customer.find((customer) => {
      if (customer.phone === req.body.phone && customer.password === req.body.password) { // Need to add password encryption.
        req.session.customer = customer;
      };
    });
    res.status(401).send('Invalid credential');
  };
};

module.exports = {
  create_customer,
  customer_signin
};