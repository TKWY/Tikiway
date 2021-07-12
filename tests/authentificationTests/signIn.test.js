const request = require('supertest');
const expect = require('chai').expect;
const setup = require('../test-helper');
const app = require('../../app');
const Customer = require('../../src/db/models/customerModels');

const url = '/auth/login';
const userLogin = { username: 'john.doe@mail.fr', password: 'test'};
const newUser = {
  firstName: 'John',
  lastName: 'DOE',
  phone: '+68987705645',
  password: 'test',
  email: 'john.doe@mail.fr'
};

describe('Log in Test', function () {
  setup()
  it('POST empty username return 401', async() => {
    const res = await request(app).post(url)
      .send({username: '', password: ''});
    expect(res.statusCode).to.equal(401);
    expect(res.body).to.equal('Please enter your phone number or email address!');
  });

  it('POST empty password return 401', async() => {
    await request(app).post('/customers/')
      .send(newUser)
    const res = await request(app).post(url)
      .send({username: 'test', password: ''});
    expect(res.statusCode).to.equal(401);
    expect(res.body).to.equal('Please enter your password!');
  });

  it('POST false username return 403', async() => {
    await request(app).post('/customers/')
      .send(newUser)
    const res = await request(app).post(url)
      .send({username: 'john.doe@mail.com', password: 'test'});
    expect(res.statusCode).to.equal(403);
    expect(res.body).to.equal('That user does not exist!')
  });

  it('POST false password return 403', async() => {
    await request(app).post('/customers/')
      .send(newUser)
    const res = await request(app).post(url)
      .send({username: 'john.doe@mail.fr', password: 'false'})
    expect(res.statusCode).to.equal(403);
    expect(res.body).to.equal('Wrong password, please try again.')
  });
});
