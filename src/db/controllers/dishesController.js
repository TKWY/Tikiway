const { Dish } = require('../models/dishesModels');
const Restaurant = require('../models/restaurantModels');

postDish = (req, res) => {
  const body = req.body;
  const param = req.params
  const newDish = new Dish({
    name: body.name,
    description: body.description,
    price: body.price,
    promoPrice: body.promoPrice,
    image: body.image,
    restaurantId: param.restaurantId,
    menuId: param.menuId
  })
  Restaurant.findById(req.params.restaurantId)
    .then(restaurant => {
      const menu = restaurant.menu.id(req.params.menuId);
      menu.dishes.push(newDish)
      restaurant.save()
        .then(() => {
          res.status(201).json('New dish has been added')
        })
    })
    .catch(err => console.log(err))
};

module.exports = {
  postDish
}