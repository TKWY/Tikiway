// This controller regroup all driver methods
// Dev&Design

// Import drivers model
const Drivers = require('../models/driversModels');

// Import error controller
const errorController = require('./errorController');

const createDriver = (req, res) => {
  const body = req.body
  const newDriver = new Drivers(body)
  newDriver.save()
    .then(driver => {
      res.status(201).json(driver);
    })
    .catch(err => {
      if (err) {
        const error = errorController(err);
        res.status(error.status).json(error.err);
      }
    })
};

const getAllDriver = (req, res) => {
  Drivers.find()
    .then(drivers => {
      res.status(200).json(drivers);
    })
    .catch(err => {
      if (err) {
        res.status(500).json(err);
      }
    })
};

const getDriverById = (req, res) => {
  Drivers.findById(req.params.driverId)
    .then(driver =>  {
      res.status(200).json(driver);
    })
    .catch(err => {
      res.status(500).json(err);
    })
};

const updateDriver = (req, res) => {
  Drivers.findByIdAndUpdate(req.params.driverId, req.body)
    .then(driver =>  {
      res.status(201).json(driver);
    })
    .catch(err => {
      if (err) {
        res.status(500).json(err);
      }
    })
};

const deleteDriver = (req, res) => {
  Drivers.findByIdAndDelete(req.params.driverId)
    .then(() => {
      res.status(200).json('Driver has been deleted');
    })
    .catch(err => {
      if (err) {
        errorController(err)
      } 
    })
};

module.exports = {
  getAllDriver,
  getDriverById,
  updateDriver,
  createDriver,
  deleteDriver
}