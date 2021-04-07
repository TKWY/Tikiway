// Imports
const jwt = require('jsonwebtoken');

// Local imports
const Customer = require('../models/customerModels');
const errorController = require('./errorController');
const config = require('../../../config');

// Create a new customer account
// Must rework add account verification
const createCustomer = (req, res) => { // field check missing
  const body = req.body;
  const newCustomer = new Customer(body);
  newCustomer.save()
    .then(result => { res.json(result) })
    .catch(err => {
      console.log(err) // need to return json message for frontend handling
      res.json(errorController(err))
    })
};

// Get all customers
// will not be accessible in front end but on admin panel
const getAllCustomers = (req, res) => {
  Customer.find()
    .then((result) => { res.send(result) })
    .catch(err => { res.send(err) })
};

// Get customer by id
// need to return infos
const getCustomersById = (req, res) => {
  const id = req.params.id; // need to check if params or body
  Customer.findById(id)
    .then((result) => { res.send(result) })
    .catch((err) => { res.send(err) })
};

// Update customer infos
// id filter not returning account error if wrong account
const updateCustomer = (req, res) => {
  if (!req.session.isAuthenticated) {
    res.status(403).json('Please login first!')
  } else {
    const id = req.params.id;
    Customer.findOneAndUpdate({_id: id}, req.body, err => {
      console.log('updating')
      if (err) { res.send({code: 500, message: `User doesn't exist.` })}
    })
      .then(() => {
        Customer.findOne({_id:id})
          .then(result => { res.send(result) })
          .catch(err => { res.send(err) })
      })
      .catch(err => { res.send({code: 500, message: 'Unknown error happened.'}) })
  }
};

// Local authentication's
// cookies not saving on frontend
const customerSignIn = (req, res, next) => {
  let customer = req.body;
  if (!customer.username) { res.status(401).json({ success: false, msg: 'Please enter your phone number or email address!'})}
  if (!customer.password) { res.status(401).json({ success: false, msg: 'Please enter your password!'})}
  if (req.session.isAuthenticated) {
    res.json({success: false, msg: 'User is already logged in!', isAuthenticated: true});
  } else {
    const username = customer.username
    const token = jwt.sign({username: customer.username}, config.secret, { expiresIn: '1800s' })
    Customer.findOne({$or:[{phone: username}, {email: username}]})
      .then((response) => {
        response.comparePassword(req.body.password, function (err, IsMatch) {
          if (IsMatch) {
            req.session.isAuthenticated = true;
            res.status(200).json({ success: true, token: token, user: { id: response._id, Firstname: response.firstName, Lastname: response.lastName }});
          } else {
            req.session.isAuthenticated = false;
            res.status(403).json({ success: false, msg: 'Wrong password, please try again.'})
          }
        })
      })
      .catch(() => res.status(403).json({success: false, msg: 'That user does not exist!'}))
  }
};

// Exports
module.exports = {
  createCustomer, updateCustomer, customerSignIn,
  getAllCustomers, getCustomersById
};
