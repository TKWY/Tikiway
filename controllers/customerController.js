const Customer = require('../models/customerModels');
const errorController = require('./errorController');
const jwt = require('jsonwebtoken');
const config = require('../config');

// Create a new customer account
const createCustomer = (req, res) => {
  const body = req.body;
  const newCustomer = new Customer(body);
  newCustomer.save()
    .then(result => { res.json(result) })
    .catch(err => {
      console.log(err)
      res.json(errorController(err))
    })
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
// missing jwt
const customerSignIn = (req, res) => {
  let customer = req.body;
  if (!customer.username || !customer.password) {
    res.status(401).send('Please enter your phone number and password');
  } else {
    console.log(req.session)
    if (req.session.isAuthenticated) {
      console.log('already authenticated')
      res.send(req.session);
    } else {
      req.session.isAuthenticated = true
      const username = customer.username
      const token = jwt.sign({username: customer.username}, config.secret, { expiresIn: '1800s' })
      Customer.findOne({$or:[{phone: username}, {email: username}]})
        .then((res) => {
          res.comparePassword(req.body.password, function (err, IsMatch) {
            if (err) throw err;
            console.log('Password: ', IsMatch)
          })
        })
        .catch(err => res.status(403).json({msg: 'Bad credential'}))
      res.json({
        token: token})
    }
  }
};

// Exports
module.exports = {
  createCustomer, updateCustomer, customerSignIn,
  getAllCustomers, getCustomersById
};
