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
      const {_id, firstName, lastName} = response
      return res.status(200).json({
        code: 200,
        success: true,
        customer: {id: _id, firstname: firstName, lastname: lastName},
        msg: `Welcome to Tikiway ${firstName}, thank you for joining us.`
      })
    })
    .catch(err => {
      return res.json(errorController(err));
    })
};

// Get all customers
// Only for admin panel
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
      return res.status(200).json({code: 200, success: true, Customers: customerList})
    })
    .catch(err => {
      return res.status(500).json({code: 500, msg: 'server internal error', err: err})
    })
};

// Get customer by id
// need to return infos
getCustomersById = (req, res) => {
  if (req.session.isAuthenticated) {
    const id = req.params.id;
    const sessionID = req.session.id;
    if (id.value !== sessionID.value) {
      return res.status(500).json({code: 500, success: false, msg: 'This user is not authenticated'});
    } else {
      Customer.findById(id)
        .then((response) => {
          return res.status(200).json({
            code: 200,
            success: true,
            msg: `User id: ${response._id} found`,
            response: response
          })
        })
        .catch((err) => {
          return res.status(500).json({code: 500, success: false, msg: 'Wrong user!', err: err})
        })
    }
  } else {
    return res.status(403).json({code: 403, success: false, msg: 'Please log in first!'});
  }
};

// Update customer infos
updateCustomer = (req, res) => {
  if (!req.session.isAuthenticated) {
    return res.status(403).json({code: 403, success: false, msg: 'Please log in first!'})
  } else {
    const id = req.params.id;
    Customer.findOneAndUpdate({_id: id}, req.body, err => {
      if (err) {
        return res.send({code: 500, success: false, msg: `User doesn't exist.`})
      }
    })
      .then(() => {
        Customer.findOne({_id: id})
          .then(() => {
            return res.status(200).json({code: 200, success: true, msg: 'Customer infos has been updated'})
          })
          .catch(err => {
            throw(err)
          })
      })
      .catch(err => {
        return res.send({code: 500, success: false, msg: 'Unknown error happened.', err: err})
      })
  }
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
  getAllCustomers, getCustomersById, customerSignOut
};
