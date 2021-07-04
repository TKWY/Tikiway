const jwt = require('jsonwebtoken');
const Customer = require('../models/customerModels');
const errorController = require('./errorController');
const config = require('../../../config');

// Create a new customer account
createCustomer = (req, res) => {
  const body = req.body;
  const newCustomer = new Customer(body);
  newCustomer.save()
    .then((response) => {
      const {firstName, lastName} = response
      res.status(201).json({
        'msg': `Welcome to Tikiway ${firstName} ${lastName}, thank you for joining us.`
      })
    })
    .catch(err => {
      res.json(err);
    })
};

// Get all customers
getAllCustomers = (req, res) => {
  Customer.find()
    .then((response) => {
      const customerList = response.map(data => {
        const {_id, firstName, lastName, email, phone} = data
        return {
          id: _id,
          firstname: firstName,
          lastname: lastName,
          email: email,
          phone: phone
        }
      })
      return res.status(200).json({Customers: customerList})
    })
    .catch(err => res.json(err))
};

// Get customer by id
getCustomersById = (req, res) => {
  Customer.findById(req.params.id)
    .then(response => res.json(response))
    .catch(err => {
      if (err) {
        res.sendStatus(404)
      }
    })
}

// Update customer infos
updateCustomer = (req, res) => {
  if (!req.session.isAuthenticated) {
    res.status(403).json({msg: 'Please log in first!'})
  }
  Customer.findOneAndUpdate({_id: req.params.id}, req.body, err => {
    if (err) {
      res.status(500).json({msg: `User doesn't exist.`})
    }
  })
    .then(() => {
      Customer.findOne({_id: req.params.id})
        .then(() => {
          res.status(201).json({msg: 'Customer infos has been updated'})
        })
        .catch(err => {
          if (err) {
            res.status(500).json(err)
          }
        })
    })
    .catch(err => {
      if (err) {
        res.status(500).json(err)
      }
    })
  };

deleteCustomer = (req, res) => {
  Customer.findById(req.params.id)
    .then(response => {
      response.deleteOne({_id: req.params.id}, () => {
        res.sendStatus(204)
      })
    })
    .catch(err => {
      if (err) {
        res.status(500).json({msg: 'That customer does not exist'})
      }
    })  
};

// Local authentication's
// cookies not saving on frontend
customerSignIn = (req, res, next) => {
  const customer = req.body;
  if (!customer.username) {
    return res.status(401).json({code: 401, success: false, msg: 'Please enter your phone number or email address!'})
  }
  if (!customer.password) {
    return res.status(401).json({code: 401, success: false, msg: 'Please enter your password!'})
  }
  if (req.session.isAuthenticated) {
    return res.json({success: false, msg: 'User is already logged in!', isAuthenticated: true});
  } else {
    const username = customer.username
    const token = jwt.sign({username: customer.username}, config.secret, {expiresIn: '1800s'})
    Customer.findOne({$or: [{phone: username}, {email: username}]})
      .then((response) => {
        response.comparePassword(req.body.password, function (err, IsMatch) {
          if (IsMatch) {
            req.session.isAuthenticated = true;
            return res.status(200).json({code: 200, id: response._id, success: true, token: token});
          } else {
            req.session.isAuthenticated = false;
            return res.status(403).json({code: 403, success: false, msg: 'Wrong password, please try again.'})
          }
        })
      })
      .catch(() => {
        return res.status(403).json({code: 403, success: false, msg: 'That user does not exist!'})
      })
  }
};

customerSignOut = (req, res) => {
  if (req.session.isAuthenticated) {
    req.session.destroy((err) => {
      if (err) {
        throw(err)
      }
      return res.status(200).json('logged out!')
    })
  } else {
    return res.status(403).json({code: 403, success: false, msg: 'Please log in first!'});
  }
};

// Exports
module.exports = {
  createCustomer, updateCustomer, customerSignIn,
  getAllCustomers, getCustomersById, customerSignOut,
  deleteCustomer
};
