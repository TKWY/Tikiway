const { Menu } = require('../models/menuModels');
const Restaurant = require('../models/restaurantModels');

// Return list of all menu
getAllMenu = (req, res) => {
  Restaurant.findById(req.params.restaurantId)
    .then(response => res.json(response.menu))
    .catch(err => {
      if (err) {
        res.status(500).json(err)
        console.log(err)
      }
    })
};

// Add new menu to restaurant
postMenu = (req, res) => {
  const body = req.body;
  const newMenu = new Menu({
    category: body.category,
    restaurantId: req.params.restaurantId
  });
  Restaurant.findById(req.params.restaurantId)
    .then(response => {
      response.menu.push(newMenu);
      response.save()
        .then(result => {
          const menu = result.menu;
          res.json(menu[menu.length - 1]);
        })
        .catch(err => {
          if (err) {
            res.status(500).json(err);
          }
        })
    })
    .catch(err => {
      if (err) {
        res.status(404).json('This restaurant does not exist')
      } 
    })
};

// Return menu with specified ID
getMenuById = (req, res) => {
  Restaurant.findById(req.params.restaurantId)
    .then(response => {
      res.json(response.menu.id(req.params.menuId));
    })
    .catch(err => {
      if (err) {
        res.status(404).json('this menu does not exist');
      }
    })
};

// Update menu with specified ID
updateMenu = (req, res) => {
  Restaurant.findById(req.params.restaurantId)
    .then(response => {
      const menu =  response.menu.id(req.params.menuId);
      menu.category = req.body.category;
      response.save().
      then(() => {
        res.json(menu)
      })
      
    })
    .catch(err => {
      if (err) {
        res.status(404).json(err);
        console.log(err)
      };
    })
};

// Delete menu with specified ID
deleteMenu = (req, res) => {
  Restaurant.findById(req.params.restaurantId)
    .then(response => {
      const menu = response.menu.id(req.params.menuId);
      menu.remove();
      response.save()
        .then(() => {
          res.sendStatus(204);
        })
        .catch(err => {
          res.json(err);
          console.log(err);
        })
    })
};

module.exports = {
  postMenu,
  getAllMenu,
  getMenuById,
  updateMenu,
  deleteMenu
};