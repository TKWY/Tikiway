/*
 This controller regroup customers methods
 Customer controller need to be refactor as it need async methods
 Copyright Dev&Design
 Import Customer model
*/
const Customer = require('../models/customerModels');

// Import Error controller
const errorController = require("./errorController");

/*
 All Methods need to have a better error handling
 May have to rewrite handler in the future
 Controller will probably need to change file name to userController
 so it will be easier for the devs to identify the file.
 Method will create a new customer account and return customer
 information as a response.
 It need to handle data duplication and other errors
*/
createCustomer = async (req, res) => {
  try {
    const body = req.body;
    const newCustomer = await new Customer(body);
    const { firstName, lastName, mail, phone, _id} = await newCustomer;
    return res.status(201).json({
      id: _id,
      firstname: firstName,
      lastname: lastName,
      mail: mail,
      phone: phone
    })
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
}; 

// Method will return all the users account as a response
// Method must not be available for administrators
getAllCustomers = async (req, res) => {
  try {
    const findCustomer = await Customer.find();
    const customerList = await findCustomer.map(data => {
      const { _id, firstName, lastName, email, phone} = data;
      return {
        id: _id,
        firstname: firstName,
        lastname: lastName,
        email: email,
        phone: phone
      }
    })
    return res.status(200).json(customerList);
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
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
        const {status, message} = errorController(err);
        return res.status(status).json({message: message});
      }
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
        const {status, message} = errorController(err);
        return res.status(status).json({message: message});
      }
    })
  };

// Method will delete target user
//  This method is only available for administrators
deleteCustomer = async (req, res) => {
  try {
    const id = req.params.customerId;
    await Customer.findByIdAndDelete(id);
    return res.sendStatus(204);
  } catch (err) {
    if (err) {
      const { status, message } = errorController(err);
      return res.status(status).json({message: message});
    }
  }
};


// Export all the methods on customerController
module.exports = {
  createCustomer, 
  updateCustomer,
  getAllCustomers, 
  getCustomersById,
  deleteCustomer
};
