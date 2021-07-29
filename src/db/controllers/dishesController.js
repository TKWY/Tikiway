// This controller regroup all dishes methods
// Dev&Design

// Import Dish model
const { Dish } = require('../models/dishesModels');

// Import Restaurant model
const Restaurant = require('../models/restaurantModels');


// Method will return all the dishes of specified menu as a response
// it will get a list of dishes but yuou have to specify the restaurant Id
// and the menu Id.
// route: GET restaurants/:restaurantId/menu/:menuId/dish
getDishes = async (req, res) => {
  const { restaurantId, menuId } = req.params
  try {
    const findRestaurant = await Restaurant.findById(restaurantId);
    const findMenu = await findRestaurant.menu.id(menuId);
    const findDish = await findMenu.dishes;
    if (findDish === null ) {
      return res.sendStatus(404);
    }
    return res.status(200).json(findDish);
  } catch (err) {
    return res.json(err); // Need to check errors and return a better status code in case of an error
  }
};

// Method will return dish with specified id
// Same as the get all dishes method, you need to specify the restaurant Id and
// menu Id.
// route: GET restaurants/:restaurantId/menu/:menuId/dish/:dishId
getDishById = async (req, res) => {
  const { restaurantId, menuId, dishId } = req.params;
  try {
    const findRestaurant = await Restaurant.findById(restaurantId);
    const findMenu = await findRestaurant.menu.id(menuId);
    const findDish = findMenu.dishes.id(dishId);
    if (findDish === null) {
      return res.sendStatus(404)
    }
    return res.status(200).json(findDish);
  } catch (err) {
    return res.json(err); // Need to check errors and return a better stataus code in case of an error
  }
};

// Method will post a new dish in specified menu Id
// Need restaurant Id and menu Id
// route: POST restaurants/:restaurantId/menu/:menuId/dish/:dishId
postDish = async(req, res) => {
  const body = req.body;
  const { restaurantId, menuId } = req.params;
  try {
    const findRestaurant = await Restaurant.findById(restaurantId);
    const findMenu = await findRestaurant.menu.id(menuId);
    const dish = await findMenu.dishes;
    const newDish = await new Dish({
      name: body.name,
      description: body.description,
      price: body.price,
      promoPrice: body.promoPrice,
      image: body.image,
      restaurantId: restaurantId,
      menuId: menuId
    });
    dish.push(newDish);
    if (findRestaurant.save()) {
      const findDish = await dish[dish.length - 1];
      return res.status(201).json(findDish);
    }
    res.sendStatus(500);
  } catch (err) {
    return res.json(err); // Need to handle errors
  }
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