const { Restaurant } = require('../models/restaurantModels');

getAllRestaurant = (req, res) => {
  Restaurant.find()
    .then(response => {
      res.json(response)
    })
    .catch(err => res.json(err))
}

getRestaurantById = (req, res) => {
  const id = req.params.restaurantId;
  Restaurant.findById(id)
    .then(response => res.json(response))
    .catch(err => {
      if (err) {
        res.sendStatus(404)
      }
    })
};

getRestaurantMenuById = (req, res) => {
  id = req.params.id
  Restaurant.findById(id)
    .then(response => res.json(response))
    .catch(err => {
      if (err) {
        res.sendStatus(404)
      }
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