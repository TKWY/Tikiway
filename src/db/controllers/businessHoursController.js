// controller will contain methods to change restaurant working hours
const Restaurants = require('../models/restaurantModels');

// Method will return list of business hours for restaurant with specidied id
// required restaurant Id
// route: GET restaurants/:restaurantId/hours
const getHours = async (req, res) => {
  const id = req.params.restaurantId;
  try {
    const findRestaurant = await Restaurants.findById(id);
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
const postBusinessHours = (req, res) => {
  res.json('This is the post method')
};

// Export all methods on businessHoursController
module.exports = {
  getHours
}