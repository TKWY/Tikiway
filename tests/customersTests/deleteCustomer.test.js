// This contain all the tests for the delete method
// Dev&Design

// Import tests requirements
const expect = require('chai').expect;
const request = require('supertest');
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

// Test will delete target user and return a status code 2O4 for no content;
describe('Delete customer', function () {
  setup();
  it('Return status code 204', async() => {
    const postCustomer = await request(app).post(url).send(newUser);
    const res = await request(app).delete(url+`/${postCustomer.body.id}`);
    expect(res.statusCode).to.equal(204);
  });
});