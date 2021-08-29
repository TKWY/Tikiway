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
const coordinate = {
  addressName: 'Papeete',
  coordinates: {
    lat: 89.9,
    lng: -82.2
  }
};

describe('Post restaurant location', function() {
  setup();

  // Does it return a status code equal to 201
  it ('Return status code 201', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).post(url+`/${saveRestaurant.id}/loc`).send(coordinate);
    expect(res.statusCode).to.equal(201);
  });
  // Is response an object
  it('Return an object', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).post(url+`/${saveRestaurant.id}/loc`).send(coordinate);
    expect(res.body).is.an('object');
  })

  // Does response have a property addressName equal to Papeete
  it('Return an object with property addressName Papeete', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).post(url+`/${saveRestaurant.id}/loc`).send(coordinate);
    expect(res.body).has.property('addressName', 'Papeete');
  });

  // Does response have a property coordinates
  it('Return an object with property coordinates', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).post(url+`/${saveRestaurant.id}/loc`).send(coordinate);
    expect(res.body).has.property('coordinates');
  });

  // Is coordinates an object
  it('Return object coordinates', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).post(url+`/${saveRestaurant.id}/loc`).send(coordinate);
    expect(res.body.coordinates).is.an('object');
  });

  // Does coordinates have latitude equal to 89.9
  it('Return coordinate with latitude equal to 89.9', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).post(url+`/${saveRestaurant.id}/loc`).send(coordinate);
    expect(res.body.coordinates).has.property('lat', 89.9);
  });

  // Does coordinates have longitude equal to -82.2
  it('Return coordinate with longitude equal to -82.2', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).post(url+`/${saveRestaurant.id}/loc`).send(coordinate);
    expect(res.body.coordinates).has.property('lng', -82.2);
  })
})
