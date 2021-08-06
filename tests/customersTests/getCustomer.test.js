// This contain all the tests to get every customers
// Dev&Design

// Import tests requirements
const expect = require('chai').expect;
const request = require('supertest');

// Setup start mongoose in memory
const setup = require('../test-helper');

// Import application
const app = require('../../app');

// Import user model
const User = require('../../src/db/models/customerModels');

// Local object and url to use for tests
const url = '/api/customers'
const newUser = {
  firstName: 'John',
  lastName: 'Doe',
  phone: '+68987705645',
  password: 'test',
  email: 'john.doe@mail.fr'
}

// Tests
describe('Get all customers', function () {
  setup()

  // Will create user before each tests
  beforeEach(async () => {
    const user = await new User(newUser);
    return await user.save()
  })

  // Does it return a status code 200?
  it('Return status code 200', async () => {
    const res = await request(app).get(url);
    return expect(res.statusCode).to.equal(200);
  });

  // Is response an array?
  it('Return an array', async () => {
    const res = await request(app).get(url);
    expect(res.body).to.be.instanceof(Array);
  });

  // Does array contain objects?
  it ('Return an array containing objects', async () => {
    const res = await request(app).get(url);
    res.body.every(customer => {
      expect(customer).to.be.instanceof(Object);
    })
  })

  // Does object has a property lastname?
  it('Returned object has a property lastname', async () => {
    const res = await request(app).get(url);
    expect(res.body).to.be.instanceof(Array);
    res.body.every(result => {
      expect(result).property('lastname');
      expect(result).to.contain({lastname: 'Doe'})
    })
  });

  // Does object has property firstname
  it('Returned object has a property firstname', async () => {
    const res = await request(app).get(url);
    expect(res.body).to.be.instanceof(Array);
    res.body.every(result => {
      expect(result).property('firstname');
      expect(result).to.contain({firstname: 'John'})
    })
  });

  // Does object has property email
  it('Returned object has a property email', async () => {
    const res = await request(app).get(url);
    expect(res.body).to.be.instanceof(Array);
    res.body.every(result => {
      expect(result).property('email');
      expect(result).to.contain({email: 'john.doe@mail.fr'})
    })
  });

  // Does object has property phone
  it('Returned object has a property  phone', async () => {
    const res = await request(app).get(url);
    expect(res.body).to.be.instanceof(Array);
    res.body.every(result => {
      expect(result).property('phone');
      expect(result).to.contain({phone: '+68987705645'})
    })
  })
});
