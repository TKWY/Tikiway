// This contain all the tests to update customer
// Dev&Design

// Import tests requirement
const expect = require('chai').expect;
const request = require('supertest');

// Setup start mongoose in memory
const setup = require('../test-helper');

// Import application
const app = require('../../app');

// Import customer model for pre post data
const Customer = require('../../src/db/models/customerModels');

// Local objects and url to use for tests
const url = '/api/customers';
const newUser = {
  firstName: 'John',
  lastName: 'Doe',
  phone: '+68987705645',
  password: 'test',
  email: 'john.doe@mail.fr'
};
const updateUser = {
  firstName: 'Jane'
}

// Tests
describe('Update customer', function() {
  setup();

  // Tests will update user information
  // Does it return status code 201
  it( 'Return status code 201', async() => {
    const postCustomer = await new Customer(newUser);
    const saveCustomer = await postCustomer.save();
    const res = await request(app).put(url+`/${saveCustomer._id}`).send(updateUser);
    expect(res.statusCode).to.equal(201);
  });

  it('Return new firstname', async() => {
    const postCustomer = await new Customer(newUser);
    const saveCustomer = await postCustomer.save();
    const res = await request(app).put(url+`/${saveCustomer._id}`).send(updateUser);
    expect(res.body).has.property('firstname', 'Jane');
  });
})
