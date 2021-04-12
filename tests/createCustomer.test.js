const expect = require('chai').expect;
const conn = require('../src/db/index');
const app = require('../app');
const request = require('supertest');
const Customer = require('../src/db/models/customerModels')

const newUser = {
  firstName: 'John',
  lastName: 'Doe',
  phone: '+68987705645',
  password: 'test',
  email: 'john.doe@mail.fr'
}

describe('Create Customer Test', function () {
  beforeEach(done => {
    conn.connect()
      .then(() => done())
      .catch(err => done(err))
  });

  afterEach(done => {
    conn.close()
      .then(() => {
        Customer.deleteOne({email: 'john.doe@mail.fr'}, (err) => { if (err) {console.log(err)}})
        done()
      })
      .catch(err => done(err))
    })

  it('Create a new user', async () => {
    const res = await request(app).post('/customers/signup')
      .send(newUser)
    expect(res.statusCode).to.equal(200);
    expect(res.body).has.property('code', 200);
    expect(res.body).has.property('success', true);
    expect(res.body).has.property('msg', `Welcome to Tikiway ${newUser.firstName}, thank you for joining us.`)
  })
});
