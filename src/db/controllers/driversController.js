// This controller regroup all driver methods
// Dev&Design

// Import drivers model
const Drivers = require('../models/driversModels');

// Import error controller
const errorController = require('./errorController');

// Method will add a new driver 
// route: POST drivers
const createDriver = async (req, res) => {
  const body = req.body;
  try {
    const newDriver = await new Drivers(body);
    return res.status(201).json(newDriver);
  } catch (err) {
    if (err.code === 1000) {
      return res.status(409).json({error: 'An driver with that phone number already exist, please try another one.'});
    }
    console.log(err);
    return res.status(500).json(err.error);
  }
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