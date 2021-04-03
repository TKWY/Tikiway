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
const getAllCustomers = (req, res) => {
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
      .catch(err => { res.send({code: 500, message: 'Unknown error happened.'}) })
};

// Local authentication's
// must add possibility to log with email too
const customerSignIn = (req, res) => {
  let customer = req.body
  if (!customer.username || !customer.password) {
    res.status(401).send('Please enter your phone number and password');
  } else {
    const username = customer.username
    Customer.findOne({$or:[{phone: username}, {email: username}]} )
      .then((res) => {
        console.log(res)
        res.comparePassword(req.body.password, function (err, IsMatch) {
          if (err) throw err;
          console.log('Password: ', IsMatch)
        })
      })
      .catch(err => console.log(err))
  }
};

// Exports
module.exports = {
  createCustomer, updateCustomer, customerSignIn,
  getAllCustomers, getCustomersById
};
