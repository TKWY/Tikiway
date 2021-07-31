const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');
const setup = require('../test-helper');

describe('Homepage', function () {
  setup()
  it('GET / should return 404', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).to.equal(200);
  });

  it('GET /customers should return 200', async () => {
    const res = await request(app).get('/customers');
    expect(res.statusCode).to.equal(200);
  });

  it('GET /customer should return list of customers', async () => {
    const res = await request(app).get('/customers');
    expect(res.body).to.be.instanceof(Array);
    res.body.every(result => {
      expect(result).property('lastname');
      expect(result).to.contain({lastname: 'DOE'})
    })
  });
});
