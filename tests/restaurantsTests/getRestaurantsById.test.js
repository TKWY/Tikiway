const setup = require('../test-helper');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

const url = '/restaurants'
describe('Get restaurant by id', function() {
  setup()
  it('Return status code 200', async() => {
    const res = await request(app).get(url)
    expect(res.statusCode).to.equal(200)
  });

  //it('Return status code 404 restaurant does not exist', async() => {
  //  const res = await request(app).get(url)
  //  expect(res.statusCode).to.equal(404)
  //  expect(res.statusCode).to.not.equal(200)
  //});
})