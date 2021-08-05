// This controller regroup all driver methods
// Dev&Design

// Import drivers model
const Drivers = require('../models/driversModels');

// Import error controller
const errorHandler = require('./errorController');
const {response} = require("express");
const errorController = require("./errorController");

// Method will add a new driver 
// route: POST drivers
const createDriver = async (req, res) => {
  const body = req.body;
  try {
    const newDriver = await new Drivers(body);
    const saveDriver = await newDriver.save();
    return res.status(201).json(saveDriver);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        error: 'An driver with that phone number or email address already exist, \
        please try another one.'
      });
    }
    console.log(err);
    return res.status(500).json({error: err.error});
  }
};

// Method will return a list of all the driver
// route: GET /drivers
const getAllDriver = async(req, res) => {
  try {
    const findDrivers = await Drivers.find();
    const driversCollection = await findDrivers.map(drivers => {
      const { firstName, lastName, mail, phone, workingStatus, _id } = drivers;
      return {
        id: _id,
        firstname: firstName,
        lastname: lastName,
        phone: phone,
        email: mail,
        workingStatus: workingStatus
      };
    });
    return res.status(200).json(driversCollection);
  } catch (err) {
    if (err) {
      return errorHandler(err);
    }
  }
};


// Method will return driver with specified Id
// route: drivers/:driverId
const getDriverById = async(req, res) => {
  const { driverId } = req.params;
  try {
    const findDriver = await Drivers.findById(driverId);
    const { _id, firstName, lastName, mail, workingStatus, phone } = findDriver;
    return res.status(200).json({
      id: _id,
      firstname: firstName,
      lastname: lastName,
      phone: phone,
      mail: mail,
      workingStatus: workingStatus
    })
  } catch(err) {
    if (err) {
      return errorHandler(err);
    }
  }
};

// Method will update driver with specified Id
// route: PUT drivers/:driverId
const updateDriver = async(req, res) => {
  try {
    const {driverId} = req.params;
    const driverUpdate = req.body;
    const findDriver = await Drivers.findByIdAndUpdate(driverId, driverUpdate);
    if (findDriver === null) {
      return res.sendStatus(404);
    }
    return res.status(201).json(findDriver);
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
};


// Method will delete driver with specified Id
// route: DELETE drivers/:driverId
const deleteDriver = async (req, res) => {
  try {
    const {driverId} = req.params;
    const findDriver = await Drivers.findByIdAndDelete(driverId);
    if (findDriver === null) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
};

// add method to set driver workingStatus
// add in delivery status in model
// add get drivers with online status

// Export all methods on driversController
module.exports = {
  getAllDriver,
  getDriverById,
  updateDriver,
  createDriver,
  deleteDriver
}