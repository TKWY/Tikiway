// This contain all the tests to create new customers
// Dev&Design

// Import tests requirements
const expect = require('chai').expect;
const request = require('supertest');

// Setup start mongoose in memory
const setup = require('../test-helper');

// Import application
const app = require('../../app');

// Local objects and url to use for tests
let url = '/api/customers';
let newUser = {
  firstName: 'John',
  lastName: 'Doe',
  phone: '+68987705645',
  password: 'test',
  email: 'john.doe@mail.fr'
};

// Tests
describe('Create new customer', function () {
  setup();

  // Test will create a new customer
  // Does it return a status code 201?
  it('Return status code 201', async () => {
    const res = await request(app).post(url).send(newUser);
    return expect(res.statusCode).to.equal(201);
  });

  // Is response an object?
  it('Return a object', async () => {
    const res = await request(app).post(url).send(newUser);
    return expect(res.body).is.a('Object');
  });

  // Does it return customer firstname?
  it('Return a object with property firstname', async () => {
    const res = await request(app).post(url).send(newUser)
    return expect(res.body).has.property('firstname', 'John')
  });

  // Does it return customer lastname?
  it ('Return a object with property lastname', async () => {
    const res = await request(app).post(url).send(newUser);
    return expect(res.body).has.property('lastname', 'Doe')
  });

  // Does it return customer phone number?
  it ('Return a object with property phone', async() => {
    const res = await request(app).post(url).send(newUser);
    return expect(res.body).has.property('phone', '+68987705645');
  });
});
