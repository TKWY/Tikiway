const jwt = require('jsonwebtoken');
const {secret} = require('../../../config');
const Customer = require('../models/customerModels');

login = (req, res) => {
  const customer = req.body;
  if (!customer.username) {
    return res.status(401).json('Please enter your phone number or email address!')
  }
  if (!customer.password) {
    return res.status(401).json('Please enter your password!')
  }
  if (req.session.isAuthenticated) {
    return res.status(401).json('You are already logged in!');
  } else {
    const username = customer.username
    Customer.findOne({$or: [{phone: username}, {email: username}]})
      .then((response) => {
        response.comparePassword(req.body.password, function (err, IsMatch) {
          if (IsMatch) {
            req.session.isAuthenticated = true;
            jwt.sign({id: response.id}, secret, {expiresIn: 6*30*24*3600})
            return res.status(200).json('Thank you for logging in.');
          } else {
            req.session.isAuthenticated = false;
            return res.status(403).json('Wrong password, please try again.')
          }
        })
      })
      .catch(() => {
        return res.status(403).json('That user does not exist!')
      })
  }
};

logout = (req, res) => {
  if (req.session.isAuthenticated) {
    req.session.destroy((err) => {
      if (err) {
        throw(err)
      }
      return res.status(200).json('You have logged out')
    })
  } else {
    return res.status(403).json('Please log in first!');
  }
};

isAuthenticated = (req, res, next) => {
  console.log(req.session)
  if (req.session.isAuthenticated) {
    return next();
  }
  return res.status(401).json({message: 'User is not authenticated, please log in first.'})
};

module.exports = {
  login,
  logout,
  isAuthenticated
};
