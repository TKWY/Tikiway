// This controller regroup customers methods
// Copyright Dev&Design

// Import Customer model
const Customer = require('../models/customerModels');

// Import Error controller
const errorController = require('./errorController');

// All Methods need to have a better error handling
// May have to rewrite handler in the future
// Controller will probably need to change file name to userController
// so it will be easier for the devs to identify the file.

// Method will create a new customer account and return customer
// informations as a response.
// It need to handle data duplication and other errors
createCustomer = (req, res) => {
  // Get post body
  const body = req.body;
  const newCustomer = new Customer(body);
  newCustomer.save()
    .then((response) => {
      // Return user information as a response
      res.status(201).json({
        firstName: response.firstName,
        lastname: response.lastName,
        mail: response.mail,
        phone: response.phone
    })
    .catch(err => {
      // submit error to the error controller
      // return response depending on error code
      if (err) {
        errorController(err);
      }
    })
  })
}; 

// Method will return all the users account as a response
// Method must not be available for administrators
getAllCustomers = (req, res) => {
  // Find all customers
  Customer.find()
    .then(customers => {
      const customerList = customers.map(data => {
        // Decompose array to return objects in a list of objects
        return {
          id: data._id,
          firstname: data.firstName,
          lastname: data.lastName,
          email: data.email,
          phone: data.phone
        }
      })
      return res.status(200).json(customerList);
    })
    .catch(err => {
      // return internal error message
      if (err) {
        res.status(500).json(err);
      };
    })
};

// Method will return target user informations as a response
// This method serve only connected user
getCustomersById = (req, res) => {
  // Find user with target id
  Customer.findById(req.params.id)
    .then(response => {
      // And return user information
      res.status(200).json({
        id: response._id,
        firstname: response.firstName,
        lastname: response.lastName,
        birthdate: response.dateOfBirth,
        email: response.email,
        phone: response.phone,
        profileImage: response.profileImage
      })
    })
    .catch(err => {
      // If user does not exist return 404 error
      if (err) {
        res.sendStatus(404);
      };
    })
};

// Method will update target id and return updated informations
updateCustomer = (req, res) => {
  // Check if user is logged in and have cookie
  if (!req.session.isAuthenticated) {
    res.status(403).json('Please log in first');
  };
  // If logged in check if current user is in the database
  // And update user informations
  Customer.findOneAndUpdate({_id: req.params.id}, req.body, err => {
    if (err) {
      // If error return status code 500 user does not exist
      res.sendStatus(404);
    };
  })
    .then(() => {
      // Find user with target Id
      Customer.findOne({_id: req.params.id})
        .then(customer => {
          // Return user information
          res.status(201).json({
            phone: customer.phone,
            email: customer.email,
            firstname: customer.firstName,
            lastname: customer.lastName,
            birthdate: customer.dateOfBirth
          })
        })
        .catch(err => {
          // If user does not exist return 404 error
          if (err) {
            res.status(404)
          }
        })
    })
    .catch(err => {
      if (err) {
        // If error return server side error
        res.status(500).json(err)
      }
    })
  };

// Method will delete target user
//  This method is only available for administrators
deleteCustomer = (req, res) => {
  // Find target user
  Customer.findById(req.params.id)
    .then(response => {
      // Delete user with target Id
      response.deleteOne({_id: req.params.id}, () => {
        // Return status code 204 to validate target user suppression
        res.sendStatus(204)
      })
    })
    .catch(err => {
      // if target user does not exist return 404 error
      if (err) {
        res.status(404)
      }
    })  
};


// Export all the methods on customerController
module.exports = {
  createCustomer, 
  updateCustomer,
  getAllCustomers, 
  getCustomersById,
  deleteCustomer
};
