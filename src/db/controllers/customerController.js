// This controller regroup customers methods
// Copyright Dev&Design

// Import Customer model
const Customer = require('../models/customerModels');

// Import Error controller
const errorController = require("./errorController");

// Method will create a new customer account and return customer information
// route: POST api/v1/customers
createCustomer = async (req, res) => {
  try {
    const body = req.body;
    const newCustomer = await new Customer(body);
    const { firstName, lastName, mail, phone, _id} = await newCustomer;
    await newCustomer.save();
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
// Route: GET api/v1/customers
getAllCustomers = async (req, res) => {
  try {
    const findCustomer = await Customer.find();
    const customerList = await findCustomer.map(data => {
      const { _id, firstName, lastName, email, phone, profileImage} = data;
      return {
        id: _id,
        firstname: firstName,
        lastname: lastName,
        email: email,
        phone: phone,
        image: profileImage
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
// route GET api/v1/customers/:id
getCustomersById = async (req, res) => {
  try {
    const id = req.params.id;
    const findCustomer = await Customer.findById(id)
    const { _id, lastName, firstName, email, phone, profileImage } = findCustomer;
    const customer = {
      id: _id,
      lastname: lastName,
      firstname: firstName,
      email: email,
      phone: phone,
      image: profileImage
    };
    res.status(200).json(customer)
  } catch (err) {
    if (err) {
      let { status, message } = errorController(err);
      return res.status(status).json({message: message});
    }
  }
};

// Method will update target id and return updated informations
// route: PUT api/v1/customers/:id
updateCustomer = async(req, res) => {
  try {
    const { id } = req.params;
    const findCustomer = await Customer.findByIdAndUpdate(id, req.body, {new: true});
    const { _id, firstName, lastName, email, phone, profileImage } = findCustomer;
    const customer = {
      id: _id,
      lastname: lastName,
      firstname: firstName,
      email: email,
      phone: phone,
      image: profileImage
    };
    return res.status(201).json(customer);
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
}

// Method will delete target user
//  This method is only available for administrators
// route: api/v1/customers/:id
deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
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
