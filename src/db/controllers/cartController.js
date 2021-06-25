const Cart = require('../models/cartModels');

addDishToCart = (req, res) => {
  const body = req.body;
  const postCart = new Cart(req.body);
  postCart.save()
    .then(cart => {
      res.status(201).json(cart);
    })
    .catch(err => {
      res.status(500).json(err);
    })
};

module.exports = { addDishToCart };