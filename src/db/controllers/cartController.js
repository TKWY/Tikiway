const Cart = require('../models/cartModels');

addDishToCart = (req, res) => {
  const body = req.body;
  const postCart = new Cart(req.session['cart']? req.session['cart']: {});
  postCart.save(body)
    .then(cart => {
      dishes = cart.dishes
      dishes.push(body.dishes)
      req.session['cart'] = cart
      res.status(201).json(cart);
    })
    .catch(err => {
      if (err) {
        console.log(err)
        res.status(500).json(err);
      }
    })
};

module.exports = { addDishToCart };