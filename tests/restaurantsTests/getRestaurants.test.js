const setup = require('../test-helper');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

const url = '/restaurants';

describe('Get all restaurant', function() {
  setup()
  it('Return status code 200', async() => {
    const res = await request(app).get(url)
    expect(res.statusCode).to.equal(200);
  });

  it('Return array list of restaurants', async() => {
    const res = await request(app).get(url)
    expect(res.body).to.be.an('array')
  });
});