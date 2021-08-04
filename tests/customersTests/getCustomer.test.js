const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');
const setup = require('../test-helper');
const User = require('../../src/db/models/customerModels');

const url = '/api/customers'
const newUser = {
  firstName: 'John',
  lastName: 'Doe',
  phone: '+68987705645',
  password: 'test',
  email: 'john.doe@mail.fr'
}

const addUser = async () => {
  const user = await new User(newUser);
  return await user.save();
}

describe('Get all customers', function () {
  setup()
  it('GET return status code 200', async () => {
    try {
      await addUser();
      const res = await request(app).get(url);
      return expect(res.statusCode).to.equal(200);
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  });

  it('GET return an array', async () => {
    await addUser();
    const res = await request(app).get(url);
    expect(res.body).to.be.instanceof(Array);
  });

  it('GET return an array with a property lastname', async () => {
    await addUser();
    const res = await request(app).get(url);
    expect(res.body).to.be.instanceof(Array);
    res.body.every(result => {
      expect(result).property('lastname');
      expect(result).to.contain({lastname: 'Doe'})
    })
  });

  it('GET return an array with property firstname', async () => {
    await addUser();
    const res = await request(app).get(url);
    expect(res.body).to.be.instanceof(Array);
    res.body.every(result => {
      expect(result).property('firstname');
      expect(result).to.contain({firstname: 'John'})
    })
  });

  it('GET return an array with property email', async () => {
    await addUser();
    const res = await request(app).get(url);
    expect(res.body).to.be.instanceof(Array);
    res.body.every(result => {
      expect(result).property('email');
      expect(result).to.contain({email: 'john.doe@mail.fr'})
    })
  });

  it('GET return an array with property phone', async () => {
    await addUser();
    const res = await request(app).get(url);
    expect(res.body).to.be.instanceof(Array);
    res.body.every(result => {
      expect(result).property('phone');
      expect(result).to.contain({phone: '+68987705645'})
    })
  })
});
