const expect = require('chai').expect;
const app = require('../../app');
const request = require('supertest');
const setup = require('../test-helper');

let url = '/api/customers'
let newUser = {
  firstName: 'John',
  lastName: 'Doe',
  phone: '+68987705645',
  password: 'test',
  email: 'john.doe@mail.fr'
}

describe('Create new customer', function () {
  setup();
  it('Post return status code 201', async () => {
    try {
      const res = await request(app).post(url).send(newUser);
      return expect(res.statusCode).to.equal(201);
    } catch (err) {
      if (err) {
        return console.log(err);
      }
    }
  });

  it('Post return a object', async () => {
    try {
      const res = await request(app).post(url).send(newUser);
      return expect(res.body).is.a('Object');
    } catch (err) {
      if (err) {
        return console.log(err);
      }
    }
  });

  it('Post return a object with property firstname', async () => {
    try {
      const res = await request(app).post(url).send(newUser)
      return expect(res.body).has.property('firstname', 'John')
    } catch (err) {
      if (err) {
        return console.log(err)
      }
    }
  });

  it ('Post return a object with property lastname', async () => {
    try {
      const res = await request(app).post(url).send(newUser);
      return expect(res.body).has.property('lastname', 'Doe')
    } catch (err) {
      return console.log(err)
    }
  });

  it ('Post return a object with property phone', async() => {
    try {
      const res = await request(app).post(url).send(newUser);
      return expect(res.body).has.property('phone', '+68987705645');
    } catch (err) {
      if (err) {
        return console.log(err);
      }
    }
  });
});
