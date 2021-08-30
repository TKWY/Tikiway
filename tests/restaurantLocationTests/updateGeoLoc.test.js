// This contain all the tests to update geolocation
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

// Local object and url to use for tests
const url = '/api/restaurants';
const newRestaurant = {
  name: `Pizz'Burger`,
  description: `Pizz'burger c'est des pizzas, mais pas que, c'est aussi des burgers, des tacos, et des kebabs...`
};
const coordinate = {
  addressName: 'Papeete',
  coordinates: {
    lat: 89.9,
    lng: -82.2
  }
};

describe('Update restaurant location', function() {
  setup();

  // Does it return status code equal to 204
  it('Return status 204', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).put(url+`/${saveRestaurant.id}/loc/${saveRestaurant.address[0].id}`).send(coordinate);
    expect(res.statusCode).to.equal(201);
  });

  // Does it return an address name equal to Papeete
  it('Return updated response with address name Papeete', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).put(url+`/${saveRestaurant.id}/loc/${saveRestaurant.address[0].id}`).send(coordinate);
    expect(res.body).has.property('addressName', 'Papeete');
  });
})
