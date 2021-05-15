const setup = require('../test-helper');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

const url = '/restaurants';

describe('Get all restaurant', function() {
  setup()
  it('Return status code 200', async() => {
    const res = await request(app).get('/restaurants')
    expect(res.statusCode).to.equal(200);
  });

  it('Contain code 200', async() => {
    const res = await request(app).get('/restaurants')
    expect(res.body).has.property('code', 200)
  });

  it('Contain success equal to true', async() => {
    const res = await request(app).get('/restaurants')
    expect(res.body).has.property('success', true)
  });

  it('Return array list of restaurants', async() => {
    const res = await request(app).get('/restaurants')
    expect(res.body.restaurants).to.be.an('array')
  });
});