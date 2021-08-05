// controller will contain methods to change restaurant working hours
const Restaurants = require('../models/restaurantModels');
const errorController = require("./errorController");

// Method will return list of business hours for restaurant with specified id
// required restaurant Id
// route: GET api/restaurants/:restaurantId/hours
const getHours = async (req, res) => {
  try {
    const {restaurantId} = req.params;
    const findRestaurant = await Restaurants.findById(restaurantId);
    const findBusinessHours = await findRestaurant.businessHours;
    return res.status(200).json(findBusinessHours);
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
};

// Method will add business hours to restaurant with specified id
// required restaurant id
// route: restaurants/:restaurantId/hours
const postBusinessHours = async (req, res) => {
  const id = req.params.restaurantId;
  const body = req.body;
  try {
    const findRestaurant = await Restaurants.findById(id);
    const findBusinessHours = await findRestaurant.businessHours;
    findBusinessHours.push(body);
    findRestaurant.save();
    return res.status(201).json(findBusinessHours);
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
};


// Method will post a new exception inside the business hours
const postException = (req, res) =>  {
  res.json('This is the post exception');
};

// Export all methods on businessHoursController
module.exports = {
  getHours,
  postBusinessHours,
  postException
}