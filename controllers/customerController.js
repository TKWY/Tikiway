const Customer = require('../models/customerModels');
// handle customers operation
// get user
// signin
// check password
// encrypt password

// Create a new customer account
const create_customer = (req, res) => {
  const newCustomer = new Customer(req.body)
  newCustomer.save()
    .then((result) => {
      res.send(result);
    })
    .catch(() => {
      res.status(409).send('This phone number is already used.');
    })
};

// Get all customers
const get_all_customers = (req, res) => {
  Customer.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
};

// Get customer by id

// Local authenticatification
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
  customer_signin,
  get_all_customers
};