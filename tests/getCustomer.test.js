const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const dbHandler = require('./test-helper');
const Customer = require('../src/db/models/customerModels')

const newUser = {
  firstName: 'John',
  lastName: 'DOE',
  phone: '+68987705645',
  password: 'test',
  email: 'john.doe@mail.fr'
}

describe('Homepage', function (d) {
  beforeEach(async () => {
    await dbHandler.connect()
      .then(async () => {
        const customer = new Customer(newUser);
        await customer.save();
      })
  });

  afterEach(async () => {
    await dbHandler.clearDatabase()
  });

  after(async () => {
    await dbHandler.closeDatabase()
  })

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
