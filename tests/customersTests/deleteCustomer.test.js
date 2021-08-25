// This contain all the tests for the delete method
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
describe('Delete customer', function () {
  setup();

  // Test will return 204 if customer has been deleted
  it('Return status code 204', async() => {
    const postCustomer = await request(app).post(url).send(newUser);
    const res = await request(app).delete(url+`/${postCustomer.body.id}`);
    expect(res.statusCode).to.equal(204);
  });
});