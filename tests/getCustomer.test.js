const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const conn = require('../src/db/index');
const Customer = require('../src/db/models/customerModels')

const updateUser = { firstName: 'Jane' }
const userLogin = { username: 'john.doe@mail.fr', password: 'test'}
const newUser = {
  firstName: 'John',
  lastName: 'DOE',
  phone: '+68987705645',
  password: 'test',
  email: 'john.doe@mail.fr'
}

describe('Homepage', function (d) {
  beforeEach((done) => {
    conn.connect()
      .then(() => done())
      .catch(err => done(err))
  });

  afterEach((done) => {
    conn.close()
      .then(() => {
        Customer.collection.drop()
        done()
      })
      .catch(err => done(err))
  });

  it('GET / should return 404', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).to.equal(404);
  });

  it('GET /customers should return 200', async () => {
    const res = await request(app).get('/customers');
    expect(res.statusCode).to.equal(200);
  });

  it('GET /customer should return list of customer', async () => {
    const newCustomer = new Customer(newUser);
    await newCustomer.save()
    const res = await request(app).get('/customers');
    expect(res.body.Customers).to.be.instanceof(Array);
    res.body.Customers.every(result => {
      expect(result).property('lastname');
      expect(result).to.contain({lastname: 'DOE'})
    })
  });
});
