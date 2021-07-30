// This controller regroup all restaurant methods
// Dev&Design

// Import Restaurant model
const Restaurant = require('../models/restaurantModels');

// Method will return a list of all restaurant
// route: restaurants
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
// route: restaurants/:restaurantId
getRestaurantById = async (req, res) => {
  const id = req.params.restaurantId;
  try {
    const findRestaurant = await Restaurant.findById(id);
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
    return res.status(500).json({error: 'Internal Server Error'})
  }
};

// Method will update restaurant informations with specified Id
// restaurant owner can change their information themselve
updateRestaurant = (req, res) => {
  Restaurant.findByIdAndUpdate(req.params.restaurantId, req.body)
    .then(() => res.status(201).json({msg: 'Restaurant has been updated'}))
    .catch(err => {
      if (err) {
        return res.status(404).json(err)
      }
    })
};

deleteRestaurant = (req, res) => {
  Restaurant.findByIdAndDelete(req.params.restaurantId)
    .then(() => res.sendStatus(204))
    .catch(err => {
      if (err) {
        res.status(404).json(err)
      }
    })
};

module.exports = {
  getAllRestaurant,
  getRestaurantById,
  postRestaurant,
  deleteRestaurant,
  updateRestaurant
};