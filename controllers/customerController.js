const Customer = require('../models/customerModels');
const errorController = require('./errorController');


// Create a new customer account
const createCustomer = (req, res) => {
  const body = req.body;
  const newCustomer = new Customer(body);
  newCustomer.save()
    .then(result => { res.send(result) })
    .catch(err => { res.send(errorController(err)) })
};


// Get all customers
const get_all_customers = (req, res) => {
  Customer.find()
    .then((result) => { res.send(result) })
    .catch(err => { res.send(err) })
};


// Get customer by id
const getCustomersById = (req, res) => {
  const id = req.params.id; // need to check if params or body
  Customer.findById(id)
    .then((result) => { res.send(result) })
    .catch((err) => { res.send(err) })
};


// Update customer infos
const updateCustomer = (req, res) => {
  const id = req.params.id;
    Customer.findOneAndUpdate({_id: id}, req.body, err => {
      if (err) { res.send({code: 500, message: `User doesn't exist.` })}
    })
      .then(() => { 
        Customer.findOne({_id:id})
          .then(result => { res.send(result) })
          .catch(err => { res.send(err) })
        })
      .catch(err => { res.send({code: 500, message: 'Unknow error happened.'}) }) 
};


// Local authenticatification
// authentication need rework with password comparaison in model.
const customerSignin = (req, res) => {
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
  createCustomer, updateCustomer, customerSignin,
  getAllCustomers, getCustomersById 
};