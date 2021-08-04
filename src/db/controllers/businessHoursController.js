// controller will contain methods to change restaurant working hours
const Restaurants = require('../models/restaurantModels');

// Method will return list of business hours for restaurant with specidied id
// required restaurant Id
// route: GET restaurants/:restaurantId/hours
const getHours = async (req, res) => {
  const {restaurantId} = req.params;
  try {
    const findRestaurant = await Restaurants.findById(restaurantId);
    if (findRestaurant === null) {
      return res.sendStatus(404);
    } else {
      const findBusinessHours = await findRestaurant.businessHours;
      return res.status(200).json(findBusinessHours);
    }
  } catch (err) {
    if (err) {
      return res.status(500).json({error: err.error});
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
    if (!findRestaurant) {
      return res.sendStatus(404);
    }
    findBusinessHours.push(body);
    findRestaurant.save();
    return res.status(201).json(findBusinessHours);
  } catch (err) {
    if (err) {
      return res.status(500).json({error: err.error});
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