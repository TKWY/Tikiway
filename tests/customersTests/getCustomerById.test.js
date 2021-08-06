// This contain all the tests to get target customer with specified Id
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
let newCustomer = {
  firstName: 'John',
  lastName: 'Doe',
  phone: '+68987705645',
  password: 'test',
  email: 'john.doe@mail.fr'
};

// Tests
describe('Get customer by Id', function() {
  setup();

  // Does it return a status code 200?
  it ('Return status code 200', async () => {
    const customer = await request(app).post(url).send(newCustomer);
    const res = await request(app).get(url+`/${customer.body.id}`);
    expect(res.statusCode).to.equal(200);
  });

  // Is response an object?
  it ('Return an object', async () => {
    const customer = await request(app).post(url).send(newCustomer);
    const res = await request(app).get(url+`/${customer.body.id}`);
    expect(res.body).to.be.instanceof(Object)
  });

  // Does object has a property lastname?
  it ('Returned object has a property lastname', async () => {
    const customer = await request(app).post(url).send(newCustomer);
    const res = await request(app).get(url+`/${customer.body.id}`);
    expect(res.body).property('lastname');
    expect(res.body).to.contain({lastname: 'Doe'});
  });

  // Does object has a property firstname?
  it ('Returned object has a property firstname', async () => {
    const customer = await request(app).post(url).send(newCustomer);
    const res = await request(app).get(url+`/${customer.body.id}`);
    expect(res.body).property('firstname');
    expect(res.body).to.contain({firstname: 'John'});
  });

  // Does object had a property email?
  it ('Returned object has a property email', async () => {
    const customer = await request(app).post(url).send(newCustomer);
    const res = await request(app).get(url+`/${customer.body.id}`);
    expect(res.body).property('email');
    expect(res.body).to.contain({email: 'john.doe@mail.fr'});
  });

  //Does object has a property phone?
  it ('Returned object has a property phone', async () => {
    const customer = await request(app).post(url).send(newCustomer);
    const res = await request(app).get(url+`/${customer.body.id}`);
    expect(res.body).property('phone');
    expect(res.body).to.contain({phone: '+68987705645'});
  });

  // Does object has a property image?
  it ('Returned object has a property image', async () => {
    const customer = await request(app).post(url).send(newCustomer);
    const res = await request(app).get(url+`/${customer.body.id}`);
    expect(res.body).property('image');
    expect(res.body).to.contain({image: 'default'});
  });
});