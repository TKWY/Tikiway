const Cart = require('../models/cartModels');

addCart = (req, res) => {
  const body = req.body;
  const postCart = new Cart(req.session['cart']? req.session['cart']: {});
  postCart.save(body)
    .then(cart => {
      dishes = cart.dishes
      dishes.push(body.dishes)
      req.session['cart'] = cart
      console.log(cart)
      res.status(201).json(cart);
    })
    .catch(err => {
      if (err) {
        console.log(err)
        res.status(500).json(err);
      }
    })
};

updateCart = (req, res) => {
  const cartId = req.session['cart']
  Cart.findById(cartId)
    .then(cart => {
      console.log(cart)
    })
    .catch(err => {
      if (err) {
        res.json(err)
      }
    })
}

fetchCart = (req, res) => {
  if (req.session['cart']) {
    const userId = req.session._id;
    Cart.findOne({customerId: userId})
      .then(cart =>{
        res.status(200).json(cart);
      })
      .catch(err => {
        if (err) {
          console.log(err);
          res.json(err);
        }
      })
  }
  const cart = new Cart(req.session['cart']? req.session['cart']: {});
  req.session['cart'] = cart;
  req.session.maxAge = 5
  res.json(cart);
};

module.exports = { addCart , fetchCart, updateCart };