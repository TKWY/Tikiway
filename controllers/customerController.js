const Customer = require('../models/customerModels');
const bcrypt = require('bcrypt');
// signin
// check password

// Create a new customer account
const create_customer = async (req, res, next) => {
  const body = req.body;
  const newCustomer = new Customer(body);

  await newCustomer.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err)
    })
};
 
// Update customer infos
const update_customer = (req, res) => {
  const id = req.params.id;
  Customer.findByIdAndUpdate(id, req.body)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

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
const get_customers_by_id = (req, res) => {
  const id = req.params.id; // need to check if params or body
  Customer.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err)
    })
}

// Local authenticatification
const customer_signin = (req, res) => {
  if (!req.body.phone || !req.body.password) {
    res.status(401).send('Please enter your phone number and password');
  } else {
    Customer.find((customer) => {
      if (customer.phone === req.body.phone && customer.password === req.body.password) { // Must add password comparaison
        req.session.customer = customer;
      };
    });
    res.status(401).send('Invalid credential');
  };
};

module.exports = {
  create_customer,
  update_customer,
  customer_signin,
  get_all_customers,
  get_customers_by_id
};