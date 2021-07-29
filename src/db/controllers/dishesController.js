// This controller regroup all dishes methods
// Dev&Design

// Import Dish model
const { Dish } = require('../models/dishesModels');

// Import Restaurant model
const Restaurant = require('../models/restaurantModels');


// Method will return all the dishes of specified menu as a response
// still need a better error handling
getDishes = async (req, res) => {
  try {
    // Find restaurant with specified Id
    const findRestaurant = await Restaurant.findById(req.params.restaurantId)
    // if restaurant is null return status code 404
    if (findRestaurant === null) {
      res.sendStatus(404);
    }
    // else if you find a restaurant try to find a menu
    const findMenu = await findRestaurant.menu.id(req.params.menuId);
    // if menu is null return status code 404
    if (findMenu === null) {
      res.sendStatus(404);
    }
    // else return a list of all the dishes in target menu
    res.status(200).json(findMenu.dishes);
  } catch (err) {
    res.json(err);
    console.log(err)
  }
};

getDishById = (req, res) => {
  Restaurant.findById(req.params.restaurantId)
    .then(response => {
      const menu = response.menu.id(req.params.menuId);
      const dish = menu.dishes.id(req.params.dishId);
      if (dish === null) {
        res.status(404).json('This dish does not exist');
      }
      res.status(200).json(dish);
    })
    .catch(err => {
      if (err) {
        res.sendStatus(404)
      };
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
      const dishes = menu.dishes
      dishes.push(newDish)
      restaurant.save()
        .then(result => {
          const menuFilter = result.menu.id(req.params.menuId)
          const dish = menuFilter.dishes
          res.status(201).json(dish[dish.length - 1]);
        })
        .catch(err => { 
          if (err) {
            res.status(500).json(err)
          }
        })
    })
    .catch(err => { 
      if (err) {
        res.status(404).json('Restaurant does not exist');
      }
    })
};

updateDish = (req, res) =>  {
  Restaurant.findById(req.params.restaurantId)
    .then(response => {
      const menu = response.menu.id(req.params.menuId);
      const dish = menu.dishes.id(req.params.dishId);
      dish.name = req.body.name
      response.save()
        .then(() => {
          if (menu === null) {
            res.status(404).json('This menu does not exist')
          }
          if (dish === null) {
            res.status(404).json('This dish does not exist')
          }
          res.status(201).json(dish);
        })
        .catch(err => {
          if (err) {
            res.status(500).json('Server internal error')
          }
        })
    })
    .catch(err => {
      if (err) {
        res.status(404).json('This restaurant does not exist')
      }
    })
};

deleteDish = (req, res) => {
  Restaurant.findById(req.params.restaurantId)
    .then(restaurant => {
      const menu = restaurant.menu.id(req.params.menuId);
      if (menu === null) {
        res.status(404).json('This menu does not exist');
      }
      const dish = menu.dishes.id(req.params.dishId);
      if (dish === null) {
        res.status(404).json('This this dish does not exist');
      }
      dish.remove();
      restaurant.save()
      res.sendStatus(204);
    })
    .catch(err => {
      if (err) {
        res.status(404).json('This restaurant does not exist')
      }
    })
};

module.exports = {
  postDish,
  getDishes,
  getDishById,
  updateDish,
  deleteDish
};