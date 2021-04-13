const expect = require('chai').expect;
const conn = require('../src/db/index');
const app = require('../app');
const request = require('supertest');
const Customer = require('../src/db/models/customerModels');

const url = '/customers/signup'
const newUser = {
  firstName: 'John',
  lastName: 'Doe',
  phone: '+68987705645',
  password: 'test',
  email: 'john.doe@mail.fr'
}

const userWithSamePhone = {
  firstName: 'Jane',
  lastName: 'Doe',
  phone: '+68987705645',
  password: 'test',
  email: 'jane.doe@mail.fr'
}

describe('Create Customer', function () {
  beforeEach((done) => {
    conn.connect()
      .then(() => (done)())
      .catch(err => done(err))
  });

  afterEach((done) => {
    Customer.collection.drop()
    conn.close()
      .then(() => done())
      .catch(err => done(err))
    });

  it('Create a new user', async () => {
    const res = await request(app).post(url)
      .send(newUser)
    expect(res.statusCode).to.equal(200);
    expect(res.body).has.property('code', 200);
    expect(res.body).has.property('success', true);
    expect(res.body).has.property('msg', `Welcome to Tikiway ${newUser.firstName}, thank you for joining us.`)
  })
});
