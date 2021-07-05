const Drivers = require('../models/driversModels');

const createDriver = (req, res) => {
  const body = req.body
  const newDriver = new Drivers(body)
  newDriver.save()
    .then(driver => {
      res.status(201).json(driver);
    })
    .catch(err => {
      if (err) {
        res.status(500).json(err);
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
  Drivers.findById(req.body.driverId)
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
    .then(driver => {
      res.json(driver);
    })
    .catch(err => {
      if (err) {
        res.status(500).json(err);
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