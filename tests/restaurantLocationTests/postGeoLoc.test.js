// This contain all the test to add new geolocation
// Dev&Design

// Import tests requirements
const expect = require('chai').expect;
const request = require('supertest');

// Setup start mongoose in memory
const setup = require('../test-helper');

// Import restaurant model for pre post data
const Restaurant = require('../../src/db/models/restaurantModels');

// Import application
const app = require('../../app');

// Local objects and url to use for tests
const url = '/api/restaurants';
const newRestaurant = {
  name: `Pizz'Burger`,
  description: `Pizz'burger c'est des pizzas, mais pas que, c'est aussi des burgers, des tacos, et des kebabs...`
};

describe('Post restaurant location', function() {
  setup();
  it ('Return status code 200', async() => {

  })
})
