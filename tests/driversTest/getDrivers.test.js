const expect = require('chai').expect;
const app = require('../../app');
const request = require('supertest');
const setup = require('../test-helper');

const url =  '/drivers';
const newDriver = {
  phone: '11111111',
  mail: 'johndoe@mail.com',
  firstName: 'john',
  lastName: 'doe',
  password: 'test'
};

describe('Create driver account tests', function() {
  setup();
  it ('Post return status code 201', async() => {
    const res = await request(app).post(url)
      .send(newDriver);
    expect(res.statusCode).to.equal(201);
  })

  it ('Response has firstName property equal to john', async() => {
    const res = await request(app).post(url)
      .send(newDriver);
    expect(res.body).has.property('firstname', 'john');
  })
})