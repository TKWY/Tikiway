// This contain all the tests to update restaurant
// Dev&Design

// Import test requirements
const request = require('supertest');
const expect = require('chai').expect;

// Setup start mongoose in memory
const setup = require('../test-helper');

// Import application
const app = require('../../app');

// Import restaurant model for pre post data
const Restaurant = require('../../src/db/models/restaurantModels');

// Local object to use into tests
const newRestaurant = {
  name: `Pizz'Burger`,
  description: `Pizz'burger c'est des pizzas, mais pas que, c'est aussi des burgers, des tacos, et des kebabs...`,
  category: 'category'
};

const updateDescription = {
  description: `This is the new description`
};

const updateCategory = {
  category: 'This is the new category'
};

const url = "/api/restaurants";

// Tests
describe('Update restaurants tests', function(done) {
  setup();

  // Test will return 404 if restaurant does not exist
  it('Return status code 404', async() => {
    const res = await request(app).put(url+'/1').send(updateCategory);
    expect(res.statusCode).to.equal(404);
    expect(res.body).has.property('message', 'Data not found')
  })

  // Test will return 201 if restaurant is updated
  it('Return status code 201', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).put(url+`/${saveRestaurant._id}`).send(updateDescription);
    return expect(res.statusCode).to.equal(201);
  })

  // Test will return the new description
  it('Return new description', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).put(url+`/${saveRestaurant._id}`).send(updateDescription);
    return expect(res.body).has.property('description', 'This is the new description');
  })

  // Test will return the new category
  it( 'Return new category', async() => {
    const postRestaurant = await new Restaurant(newRestaurant);
    const saveRestaurant = await postRestaurant.save();
    const res = await request(app).put(url+`/${saveRestaurant._id}`).send(updateCategory);
    return expect(res.body).has.property('category', 'This is the new category');
  })
})