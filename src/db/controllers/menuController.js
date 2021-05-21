const {Menu} = require('../models/menuModels');
const {Restaurant} = require('../models/restaurantModels');

postMenu = (req, res) => {
  const body = req.body;
  const newMenu = new Menu({
    category: body.category,
    restaurantId: req.params.id
  });
  Restaurant.findById(req.params.id)
    .then(restaurant => {
      restaurant.menu.push(newMenu)
      restaurant.save()
        .then(result => {
          const menu = result.menu
          res.json(menu[menu.length - 1])
        })
        .catch(err => res.status(500).json(err))
    })
    .catch(err => res.status(500).json(err.message))
};

module.exports = {
  postMenu
};