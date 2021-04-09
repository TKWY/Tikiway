const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const conn = require('../src/db/index')

describe('Customer Service Test', () => {
  before((done) => {
    conn.connect()
      .then(() => done())
      .catch((err) => done(err))
  })

  after((done) => {
    conn.close()
      .then(() => done())
      .catch((err) => done(err))
  })

  it('Get all customers', (done) => {
    request(app).get('/customers')
      .then((res) => {
        const body = res.body
        console.log(body)
        done()
      }).catch((err) => done(err))
  })
})
