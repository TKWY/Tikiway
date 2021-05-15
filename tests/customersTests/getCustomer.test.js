const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');
const setup = require('../test-helper');

describe('Homepage', function () {
  setup()
  it('GET / should return 404', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).to.equal(404);
  });

  it('GET /customers should return 200', async () => {
    const res = await request(app).get('/customers');
    expect(res.statusCode).to.equal(200);
  });

  it('GET /customer should return list of customer', async () => {
    const res = await request(app).get('/customers');
    expect(res.body.Customers).to.be.instanceof(Array);
    res.body.Customers.every(result => {
      expect(result).property('lastname');
      expect(result).to.contain({lastname: 'DOE'})
    })
  });
});
