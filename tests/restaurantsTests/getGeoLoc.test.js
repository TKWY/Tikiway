// This contain all the test to get geolocation
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

describe('Get restaurant location', function() {
  setup();
  it('Return status code 200', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).get(url+`/${saveRestaurant._id}/loc`)
    expect(res.statusCode).to.equal(200);
  });

  it('Return a object', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).get(url+`/${saveRestaurant._id}/loc`)
    expect(res.body).to.be.an('object')
  });

  it('Return a object with property address', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).get(url+`/${saveRestaurant._id}/loc`)
    expect(res.body).has.property('addressLine', 'Restaurant')
  });

  it('Return a object with property latitude', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).get(url+`/${saveRestaurant._id}/loc`)
    expect(res.body).has.property('lat', 0.00);
  });

  it('Return a object with property longitude', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).get(url+`/${saveRestaurant._id}/loc`)
    expect(res.body).has.property('lng', 0.00);
  });
})
