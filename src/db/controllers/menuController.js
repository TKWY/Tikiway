const {Menu} = require('../models/menuModels');
const {Restaurant} = require('../models/restaurantModels');

getAllMenu = (req, res) => {
  console.log('you hit menu list')
  Restaurant.findById(req.params.restaurantId)
    .then(response => res.json(response.menu))
    .catch(err => res.status(500).json(err))
};

postMenu = (req, res) => {
  const body = req.body;
  const newMenu = new Menu({
    category: body.category,
    restaurantId: req.params.restaurantId
  });
  Restaurant.findById(req.params.restaurantId)
    .then(response => {
      response.menu.push(newMenu)
      response.save()
        .then(result => {
          const menu = result.menu
          res.json(menu[menu.length - 1])
        })
        .catch(err => res.status(500).json(err))
    })
    .catch(err => res.status(500).json(err.message))
};

module.exports = {
  postMenu,
  getAllMenu
};