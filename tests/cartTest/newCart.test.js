const setup = require('../test-helper');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app')

const restaurantUrl = '/restaurants'
const cartUrl = '/cart'
const newRestaurant = {
  name: `Pizz'Burger`,
  description: `Pizz'burger c'est des pizzas, mais pas que, c'est aussi des burgers, des tacos, et des kebabs...`,
};

const newMenu = {
  category: 'Grillade'
};

const newDish = {
  name: 'Steak frite',
  description: 'Steak et frite accompagné de sa sauce barbecue fait maison',
  price: 1200,
  promoPrice: 1100
};

describe('add item to cart', function() {
  setup();
  it('Return status code 200', async() =>{
    const postRestaurant = await request(app).post(restaurantUrl)
      .send(newRestaurant)
    const postMenu = await request(app).post(restaurantUrl+`/${postRestaurant.body._id}`+'/menu')
      .send(newMenu);
    const postDish = await request(app).post(restaurantUrl+`/${postMenu.body.restaurantId}`+'/menu'+`/${postMenu.body._id}`+'/dish')
      .send(newDish)
    const addToCart = await request(app).post(cartUrl)
      .send({dishes: {
        dishId: postDish.body._id, 
        dishName: postDish.body.name,
        quantity: postDish.body.quantity,
        restaurantId: postDish.body.restaurantId,
        price: postDish.body.price
      }})
    expect(addToCart.statusCode).to.equal(201);
  })

  it('Has the property dishes', async() =>{
    const postRestaurant = await request(app).post(restaurantUrl)
      .send(newRestaurant)
    const postMenu = await request(app).post(restaurantUrl+`/${postRestaurant.body._id}`+'/menu')
      .send(newMenu);
    const postDish = await request(app).post(restaurantUrl+`/${postMenu.body.restaurantId}`+'/menu'+`/${postMenu.body._id}`+'/dish')
      .send(newDish)
    const addToCart = await request(app).post(cartUrl)
      .send({dishes: {
        dishId: postDish.body._id, 
        dishName: postDish.body.name,
        quantity: postDish.body.quantity,
        restaurantId: postDish.body.restaurantId,
        price: postDish.body.price
      }})
    expect(addToCart.body).has.property('dishes');
  })

  it('Return a dishName', async() =>{
    const postRestaurant = await request(app).post(restaurantUrl)
      .send(newRestaurant)
    const postMenu = await request(app).post(restaurantUrl+`/${postRestaurant.body._id}`+'/menu')
      .send(newMenu);
    const postDish = await request(app).post(restaurantUrl+`/${postMenu.body.restaurantId}`+'/menu'+`/${postMenu.body._id}`+'/dish')
      .send(newDish)
    const addToCart = await request(app).post(cartUrl)
      .send({dishes: {
        dishId: postDish.body._id, 
        dishName: postDish.body.name,
        quantity: postDish.body.quantity,
        restaurantId: postDish.body.restaurantId,
        price: postDish.body.price
      }})
    expect(addToCart.body.dishes[0]).has.property('dishName', 'Steak frite');
  })
})