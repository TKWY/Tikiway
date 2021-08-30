// This controller regroup all dishes methods
// Dev&Design

// Import Dish model
const { Dish } = require('../models/dishesModels');

// Import Restaurant model
const Restaurant = require('../models/restaurantModels');
const errorController = require("./errorController");


// Method will return all the dishes of specified menu as a response
// it will get a list of dishes but you have to specify the restaurant Id
// and the menu Id.
// route: GET restaurants/:restaurantId/menu/:menuId/dish
getDishes = async (req, res) => {
  try {
    const { restaurantId, menuId } = req.params
    const findRestaurant = await Restaurant.findById(restaurantId);
    const findMenu = await findRestaurant.menu.id(menuId);
    const findDish = findMenu.dishes;
    if (!findDish) {
      return res.sendStatus(404);
    }
    return res.status(200).json(findDish);
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
};

// Method will return dish with specified id
// Same as the get all dishes method, you need to specify the restaurant Id and
// menu Id.
// route: GET restaurants/:restaurantId/menu/:menuId/dish/:dishId
getDishById = async (req, res) => {
  try {
    const { restaurantId, menuId, dishId } = req.params;
    const findRestaurant = await Restaurant.findById(restaurantId);
    const findMenu = await findRestaurant.menu.id(menuId);
    const findDish = await findMenu.dishes.id(dishId);
    if (!findDish) {
      return res.sendStatus(404)
    }
    return res.status(200).json(findDish);
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
};

// Method will post a new dish in specified menu Id
// Need restaurant Id and menu Id
// route: POST restaurants/:restaurantId/menu/:menuId/dish/:dishId
postDish = async(req, res) => {
  try {
    const { description, promoPrice, price, image, name } = req.body;
    const { restaurantId, menuId } = req.params;
    const findRestaurant = await Restaurant.findById(restaurantId);
    const findMenu = await findRestaurant.menu.id(menuId);
    const dish = findMenu.dishes;
    const newDish = await new Dish({
      name: name,
      description: description,
      price: price,
      promoPrice: promoPrice,
      image: image,
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
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
};


// Method will update dish with specified Id
// Need restaurant Id and menu Id
// route: restaurants/:restaurantId/menu/:menuId/dish/:dishId
updateDish = async (req, res) =>  {
  try {
    const { restaurantId, menuId, dishId } = req.params;
    const { name, description, price, promoPrice } = req.body;
    const findRestaurant = await Restaurant.findById(restaurantId);
    const findMenu = await findRestaurant.menu.id(menuId);
    const findDish = await findMenu.dishes.id(dishId);
    if (findDish === null) {
      return res.sendStatus(404);
    }
    // This section will need to be refactor as it need to define in a single element
    // instead of separate elements.
    findDish.name = name;
    findDish.description = description;
    findDish.price = price;
    findDish.promoPrice = promoPrice;
    findRestaurant.save()
    return res.status(201).json(findDish);
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
};

// Method will remove dish with specified Id
// Need restaurant Id and menu Id
// route: DELETE api/restaurants/:restaurantId/menu/:menuId/dish/:dishId
deleteDish = async (req, res) => {
  try {
    const { restaurantId, menuId, dishId } = req.params;
    const findRestaurant = await Restaurant.findById(restaurantId);
    const findMenu = await findRestaurant.menu.id(menuId);
    const dishes = findMenu.dishes;
    const findDish = findMenu.dishes.findIndex(dish => dish._id === dishId);
    dishes.splice(findDish);
    return res.sendStatus(204);
  } catch (err) {
    if (err) {
      const {status, message} = await errorController(err);
      return res.status(status).json({message: message});
    }
  }
};

// Export all methods on dishesController
module.exports = {
  postDish,
  getDishes,
  getDishById,
  updateDish,
  deleteDish
};
