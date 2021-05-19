const Restaurant = require('../models/restaurantModels');

getAllRestaurant = (req, res) => {
  Restaurant.find()
    .then((response) => {
      return res.status(200).json(response)
    })
    .catch(err => {
      return res.status(500).json({
        code: 500,
        success: false,
        msg: 'server internal error',
        err: err
      })
    })
}

getRestaurantById = (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .then(response => {
      res.status(200).json({
        code: 200,
        success: true,
        restaurant: response
      })
    })
    .catch(err => {
      return res.status(500).json({
        code: 500,
        success: false,
        msg: 'Restaurant does not exist',
        err: err
      })
    })
};

getRestaurantMenuById = (req, res) => {
  res.status(200).send(() => {
    console.log('This is the Restaurant menu')
  })
}

postRestaurant =(req, res) => {
  const body = req.body;
  const newRestaurant = new Restaurant(body);
  newRestaurant.save()
    .then(response => {
      return res.status(200).json(response)
    })
    .catch(err => {
      return res.status(500).json(err)
    })
};

module.exports = {
  getAllRestaurant,
  getRestaurantById,
  getRestaurantMenuById,
  postRestaurant
}