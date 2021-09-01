// This contain all the test to add new order
// Dev&Design

// Import tests requirements
const expect = require('chai').expect;
const request = require('supertest');

// Setup start mongoose in memory
const setup = require('../test-helper');

// Import models for pre post data
const Restaurant = require('../../src/db/models/restaurantModels');
const Customer = require('../../src/db/models/customerModels');
const Menu = require("../../src/db/models/menuModels");

// Import
const app = require('../../app')

// Local objects and url to use for tests
const url = '/api/restaurants'
const newRestaurant = {
  name: `Pizz'Burger`,
  description: `Pizz'burger c'est des pizzas, mais pas que, c'est aussi des burgers, des tacos, et des kebabs...`,
};

const newMenu = {
  category: 'Midi'
};

const newDish = {
  name: 'Steak frite',
  description: 'Steak et frite accompagné de sa sauce barbecue fait maison',
  price: 1200,
  promoPrice: 1100
};

describe('Post orders', function() {
  setup();

  // Does it return a status code 201
  it('Return status code 201', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const postMenu = await request(app).post(url+`/${postRestaurant.id}/menu`).send(newMenu);
    const postDish = await request(app).post(url+`/${postRestaurant.id}/menu/${postMenu.id}/dish`).send(newDish);
  })
})
