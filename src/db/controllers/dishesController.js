const { Dish } = require('../models/dishesModels');
const Restaurant = require('../models/restaurantModels');

getDishes = (req, res) => {
  Restaurant.findById(req.params.restaurantId)
    .then(restaurant => {
      const menu = restaurant.menu.id(req.params.menuId)
      res.status(200).json(menu.dishes)
    })
    .catch(err => res.json(err))
};

getDishById = (req, res) => {
  Restaurant.findById(req.params.restaurantId)
    .then(response => {
      const menu = response.menu.id(req.params.menuId)
      res.status(200).json(menu.dishes.id(req.params.dishId))
    })
    .catch(err => {
      if (err) {
        res.json(err)
        console.log(err)
      }
    })
};

postDish = (req, res) => {
  const body = req.body;
  const param = req.params;
  const newDish = new Dish({
    name: body.name,
    description: body.description,
    price: body.price,
    promoPrice: body.promoPrice,
    image: body.image,
    restaurantId: param.restaurantId,
    menuId: param.menuId
  });
  Restaurant.findById(req.params.restaurantId)
    .then(restaurant => {
      const menu = restaurant.menu.id(req.params.menuId);
      menu.dishes.push(newDish)
      restaurant.save()
        .then(result => {
          const menuFilter = result.menu.id(req.params.menuId)
          const dish = menuFilter.dishes
          res.status(201).json(dish[dish.length - 1]);
        })
        .catch(err => { 
          if (err) {
            res.json(err)
          }
        })
    })
    .catch(err => { 
      if (err) {
        res.json(err);
      }
    })
};

module.exports = {
  postDish,
  getDishes,
  getDishById
};