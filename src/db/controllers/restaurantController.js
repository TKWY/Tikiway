// This controller regroup all restaurant methods
// Dev&Design

// Import Restaurant model
const Restaurant = require('../models/restaurantModels');

// Import Error handler controller
const errorController = require('./errorController');
const {response} = require("express");

// Method will return a list of all restaurant
// route: GET restaurants
getAllRestaurant = async (req, res) => {
  try {
    const findRestaurants = await Restaurant.find();
    return res.status(200).json(findRestaurants);
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
};

// Method will return restaurant with specified Id
// route: GET api/restaurants/:restaurantId
getRestaurantById = async (req, res) => {
  const {restaurantId} = req.params;
  try {
    const findRestaurant = await Restaurant.findById(restaurantId);
    return res.status(200).json(findRestaurant);
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
};

// Method will post a new restaurant
// Restaurant name & phone number is unique
// must create a login method for the restaurant application
// restaurant will be created by admins only and password generated automatically
// as and ease of use front end will be a web application only so restaurant owned can access
// their background from any device
// route POST api/restaurants
postRestaurant = async(req, res) => {
  const body = req.body;
  try {
    const newRestaurant = await new Restaurant(body);
    const saveRestaurant = await newRestaurant.save();
    return res.status(201).json(saveRestaurant);
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
};

// Method will update restaurants information with specified Id
// restaurant owner can change their information themselves
// route PUT api/restaurants/:restaurantIdd
updateRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const findRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, req.body, {new: true});
    return res.status(201).json(findRestaurant);
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
};

// Method will delete restaurant with specified Id
// it is accessible to admins only
// route: DELETE restaurants/:restaurantId
deleteRestaurant = async (req, res) => {
  const {restaurantId} = req.params;
  try {
    await Restaurant.findByIdAndDelete(restaurantId);
    return res.sendStatus(204);
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
};

// Method will return restaurant geolocation
// route : GET restaurants/:restaurantId/loc
getLocation = async (req, res) => {
  const {restaurantId} = req.params;
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    const geolocation = await restaurant.address;
    return res.status(200).json(geolocation);
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
};

// Method will post new restaurant location
// route: POST restaurants/:restaurantId/loc
postLocation = async (req, res) => {
  const {restaurantId} = req.params;
  const body = req.body;
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    const geolocation = await restaurant.address;
    const postGeolocation = await geolocation.push(body);
    return res.status(201).json(geolocation[postGeolocation - 1]);
  } catch (err) {
    const {status, message} = await errorController(err);
    return res.status(status).json({message: message});
  }
};

// Method will update restaurant target location
// route: UPDATE restaurants/:restaurantId/loc/:locId
updateLocation = async(req, res) => {
  try {
    const {restaurantId, locId} = req.params;
    const { addressName, coordinates } = req.body;
    const findRestaurant = await Restaurant.findById(restaurantId);
    const location = await findRestaurant.address.id(locId);
    if (location === null) {
      return res.sendStatus(404);
    }
    location.addressName = addressName;
    location.coordinates = coordinates;
    findRestaurant.save();
    return res.status(201).json(location);
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
};

// Method will delete restaurant target location
// route: DELETE restaurants/:restaurantId/loc/:locId
deleteLocation = async(req, res) => {
  try {
    const {restaurantId, locId} = req.params;
    const findRestaurant = await Restaurant.findById(restaurantId);
    const location = await findRestaurant.address;
    const findLocation = await location.findIndex(location => location.id === locId);
    location.splice(findLocation);
    findRestaurant.save();
    return res.sendStatus(204);
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
}

// Export all methods on restaurantController
module.exports = {
  getAllRestaurant,
  getRestaurantById,
  postRestaurant,
  deleteRestaurant,
  updateRestaurant,
  getLocation,
  postLocation,
  updateLocation,
  deleteLocation
};
