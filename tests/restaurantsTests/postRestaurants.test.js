// This contain all the tests to create a new restaurant
// Dev&Design

// Import tests requirement
const expect = require('chai').expect;
const request = require('supertest');

// Setup start mongoose in memory
const setup = require('../test-helper');

// Import application
const app = require('../../app');

// Local objects and url to use for tests
const url = '/api/restaurants';
const newRestaurant = {
  name: `Pizz'Burger`,
  description: `Pizz'burger c'est des pizzas, mais pas que, c'est aussi des burgers, des tacos, et des kebabs...`,
}

// Tests
describe('Post new restaurant', function() {
  setup();

  // Test will return 201 if restaurant is created
  it('return status code 201', async() => {
    const res = await request(app).post(url)
      .send(newRestaurant)
    expect(res.statusCode).to.equal(201)
  });

  // Response has a property name
  it('has property name', async() => {
    const res = await request(app).post(url)
      .send(newRestaurant)
    expect(res.body).has.property('name', `Pizz'Burger`)
  });

  // Response has a property status
  it('status is ok', async() => {
    const res = await request(app).post(url)
      .send(newRestaurant)
    expect(res).has.property('ok', true)
  })

  // Response has a property description
  it('has property description', async() => {
    const res = await request(app).post(url)
      .send(newRestaurant)
    expect(res.body).has.property('description', `Pizz'burger c'est des pizzas, mais pas que, c'est aussi des burgers, des tacos, et des kebabs...`)
  });

  // Response has a property rating
  it('has property rating', async() => {
    const res = await request(app).post(url)
      .send(newRestaurant)
    expect(res.body).has.property('rating', 0)
  })
})