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
    .catch(err => res.sendStatus(404).json(err))
};

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

updateRestaurant = (req, res) => {
  Restaurant.findByIdAndUpdate(req.params.restaurantId, req.body)
    .then(response => res.json(response))
    .catch(err => res.status(500).json(err))
};

deleteRestaurant = (req, res) => {
  Restaurant.findById(req.params.restaurantId)
    .then(response => {
      response.deleteOne({_id: req.params.restaurantId}, () => {
        res.sendStatus(204)
      })
    })
    .catch(err => {
      if (err) {
        res.status(500).json({msg: 'That restaurant does not exist'})
      }
    })
}

module.exports = {
  getAllRestaurant,
  getRestaurantById,
  postRestaurant,
  deleteRestaurant
}