const {Menu} = require('../models/menuModels');
const {Restaurant} = require('../models/restaurantModels');

getAllMenu = (req, res) => {
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

getMenuById = (req, res) => {
  Restaurant.findById(req.params.restaurantId)
    .then(response => {
      res.json(response.menu.id(req.params.menuId))
    })
    .catch(err => {
      if (err) {
        res.status(404).json('this menu does not exist')
      }
    })
}

module.exports = {
  postMenu,
  getAllMenu,
  getMenuById
};