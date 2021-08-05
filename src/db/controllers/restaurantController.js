// This controller regroup all restaurant methods
// Dev&Design

// Import Restaurant model
const Restaurant = require('../models/restaurantModels');

// Import Error handler controller
const errorController = require('./errorController');

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

// Export all methods on restaurantController
module.exports = {
  getAllRestaurant,
  getRestaurantById,
  postRestaurant,
  deleteRestaurant,
  updateRestaurant
};