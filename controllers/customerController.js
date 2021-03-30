const Customer = require('../models/customerModels');
const bcrypt = require('bcrypt');
const { salt } = require('../config');
// signin
// check password

// Create a new customer account
const create_customer = async(req, res) => {
  const body = req.body;
  const newCustomer = new Customer(req.body);
  const salt = await bcrypt.genSalt(10);

  // Handle request datas
  if (!(body.phone && body.password)) {
    return res.status(400).send({error: 'Data not formatted'});
  }
  if (body.phone.length > 10) {
    return res.send({error: 'Phone number is too long.'});
  } else {
    if (body.phone.length < 10) {
      return res.send({error: 'Phone number is too short.'});
    }
  };
  
  // Save customers & handle errors
  newCustomer.password = await bcrypt.hash(newCustomer.password, salt);
  newCustomer.save()
    .then((result) => {
      res.send(result);
    })
    .catch(() => {
      res.status(409).send('This phone number is already used.');
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