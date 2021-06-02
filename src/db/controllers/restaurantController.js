const Restaurant = require('../models/restaurantModels');

getAllRestaurant = (req, res) => {
  Restaurant.find()
    .then(response => res.status(200).json(response))
    .catch(err => {
      if (err) {
        res.status(404).json(err)
      }
    })
};

getRestaurantById = (req, res) => {
  const id = req.params.restaurantId;
  Restaurant.findById(id)
    .then(response => res.status(200).json(response))
    .catch(err => {
      if (err) {
        res.status(404).json(err)
      }
    })
};

postRestaurant =(req, res) => {
  const body = req.body;
  const newRestaurant = new Restaurant(body);
  newRestaurant.save()
    .then(response => res.status(201).json(response))
    .catch(err => {
      if(err) {
        res.status(404).json(err)
      }
    })
};

updateRestaurant = (req, res) => {
  Restaurant.findByIdAndUpdate(req.params.restaurantId, req.body)
    .then(() => res.status(201).json({msg: 'Restaurant has been updated'}))
    .catch(err => {
      if (err) {
        res.status(404).json(err)
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