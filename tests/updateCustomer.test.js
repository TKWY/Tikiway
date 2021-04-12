const request = require('supertest');
const expect = require('chai').expect;
const conn = require('../src/db/index');
const app = require('../app');

describe('Update Customer Test', function () {
  beforeEach(done => {
    conn.connect()
      .then(() => done())
      .catch(err => done(err))
  });

  afterEach(done => {
    conn.close()
      .then(() => done())
      .catch(err => done(err))
  });

  it('update user return "not logged in" error' , async() => {
    const res = await request(app).put('/customers/60701d71a44d68179007e507')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@test.fr'
      })
    expect(res.statusCode).to.equal(403);
    expect(res.body).has.property('success', false);
    expect(res.body).has.property('msg', 'Please log in first!');
  });
});
