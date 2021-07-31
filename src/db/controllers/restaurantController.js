// This controller regroup all restaurant methods
// Dev&Design

// Import Restaurant model
const Restaurant = require('../models/restaurantModels');

// Method will return a list of all restaurant
// route: GET restaurants
getAllRestaurant = async (req, res) => {
  try {
    const findRestaurants = await Restaurant.find();
    if (findRestaurants === null) {
      return res.sendStatus(404);
    }
    return res.status(200).json(findRestaurants);
  } catch (err) {
    if (err) {
      console.log(err)
      return res.status(500).json(err);
    }
  }
};

// Method will return restaurant with specified Id
// route: GET restaurants/:restaurantId
getRestaurantById = async (req, res) => {
  const {restaurantId} = req.params;
  try {
    const findRestaurant = await Restaurant.findById(restaurantId);
    if (findRestaurant === null) {
      return res.sendStatus(404);
    }
    return res.status(200).json(findRestaurant);
  } catch (err) {
    if (err) {
      return res.status(500).json(err);
    }
  }
};

// Method will post a new restaurant
// Restaurant name & phone number is unique
// must create a login method for the restaurant application
// restaurant will be created by admins only and password generated automatically
// as and ease of use front end will be a web application only so restaurant owned can access
// their background from any device
// route POST restaurants
postRestaurant = async(req, res) => {
  const body = req.body;
  try {
    const newRestaurant = await new Restaurant(body);
    const saveRestaurant = await newRestaurant.save();
    return res.status(201).json(saveRestaurant);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({error: 'A restaurant with that name already exist'});
    }
    console.log(err.error);
    return res.status(500).json({error: 'Internal Server Error'})
  }
};

// Method will update restaurant informations with specified Id
// restaurant owner can change their information themselve
// route PUT restaurants/:restaurantIdd
updateRestaurant = async (req, res) => {
  const {restaurantId} = req.params;
  const { name, description, category, image } = req.body;
  const updatedRestaurant = {
    name: name,
    description: description,
    image: image,
    category: category
  }
  try {
    const findRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, updatedRestaurant);
    return res.status(201).json(findRestaurant);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({error: 'A restaurant with that name already exist'});
    }
    console.log(err.error);
    return res.status(500).json({error: 'Internal Server Error'});
  }
};

// Method will delete restaurant with specified Id
// it is accessible to admins only
// route: DELETE restaurants/:restaurantId
deleteRestaurant = async (req, res) => {
  const {restaurantId} = req.params;
  try {
    const findRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
    if (!findRestaurant) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
  } catch (err) {
    if (err) {
      res.status(500).json({error: err.error});
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