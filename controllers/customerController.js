const Customer = require('../models/customerModels');
const errorController = require('./errorController');


// Create a new customer account
const create_customer = (req, res) => {
  const body = req.body;
  const newCustomer = new Customer(body);
  newCustomer.save()
    .then(result => { res.send(result) })
    .catch(err => { res.send(errorController(err)) })
};


// Get all customers
const get_all_customers = (res) => {
  Customer.find()
    .then((result) => { res.send(result) })
    .catch((err) => { res.send(err) })
};


// Get customer by id
const get_customers_by_id = (req, res) => {
  const id = req.params.id; // need to check if params or body
  Customer.findById(id)
    .then((result) => { res.send(result) })
    .catch((err) => { console.log(err) })
};


// Update customer infos
// need tests
const update_customer = (req, res) => {
  const id = req.params.id;
  Customer.findByIdAndUpdate(id, req.body)
    .then((result) => { res.send(result) })
    .catch((err) => { res.send(err) })
};


// Local authenticatification
// authentication need rework with password comparaison in model.
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


// Exports
module.exports = { 
  create_customer, update_customer, customer_signin,
  get_all_customers, get_customers_by_id 
};