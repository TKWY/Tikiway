const Customer = require('../models/customerModels');
const errorController = require('./errorController');

// Create a new customer account
createCustomer = (req, res) => {
  const body = req.body;
  const newCustomer = new Customer(body);
  newCustomer.save()
    .then((response) => {
      const {firstName, lastName} = response
      res.status(201).json(`Welcome to Tikiway ${firstName} ${lastName}, thank you for joining us.`)
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

// Delete customer
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


// Exports
module.exports = {
  createCustomer, updateCustomer,
  getAllCustomers, getCustomersById,
  deleteCustomer
};
