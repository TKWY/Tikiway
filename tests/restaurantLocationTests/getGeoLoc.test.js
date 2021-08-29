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
    const res = await request(app).get(url+`/${saveRestaurant.id}/loc`);
    expect(res.statusCode).to.equal(200);
  });

  // Is response an array?
  it('Return a array', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).get(url+`/${saveRestaurant.id}/loc`);
    expect(res.body).to.be.an('array')
  });

  // Does array has an object with property addressName equal to Current Position?
  it('Return object with property addressName', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).get(url+`/${saveRestaurant.id}/loc`);
    expect(res.body[0]).has.property('addressName', 'Current Position')
  });

  // Does array has a property coordinates?
  it ('Return object with property coordinates', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).get(url+`/${saveRestaurant.id}/loc`);
    expect(res.body[0]).has.property('coordinates');
  });

  // Is coordinates an object?
  it('Return an object coordinates', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).get(url+`/${saveRestaurant.id}/loc`);
    expect(res.body[0].coordinates).to.be.an('object');
  })

  // Does coordinates has an object with property latitude?
  it('Return a object with property latitude', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).get(url+`/${saveRestaurant.id}/loc`);
    expect(res.body[0].coordinates).has.property('lat', 0.00);
  });

  // Does coordinates has an object with property longitude?
  it('Return a object with property longitude', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).get(url+`/${saveRestaurant.id}/loc`);
    expect(res.body[0].coordinates).has.property('lng', 0.00);
  });
})
