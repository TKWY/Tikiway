const request = require('supertest');
const expect = require('chai').expect;
const conn = require('../src/db/index');
const app = require('../app');
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

describe('Update Customer Test', function () {
  beforeEach((done) => {
    conn.connect()
      .then(() => {
        const newCustomer = new Customer(newUser);
        newCustomer.save()
        done()
      })
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

  it('update user return "not logged in" error' , async() => {
    await request(app).post('/customers/signin')
      .send(userLogin)
      .then(async(result) => {
        const id = result.body.id
        const res = await request(app).put(`/customers/${id}`)
          .send(updateUser)
        expect(res.statusCode).to.equal(403);
        expect(res.body).has.property('success', false);
        expect(res.body).has.property('msg', 'Please log in first!');
      })
  });

  it('should update user', async () => {
    await request(app).post('/customers/signin')
      .send({username: 'test@test.fr', password: 'test'})
      .then(async (result) => {
        const Cookies = result.headers['set-cookie'].map(function(r){
          return r.replace("; path=/; httponly","")}).join("; ");
        const res = await request(app).put('/customers/60701d71a44d68179007e507')
          .set('Cookie', Cookies)
          .send({ firstName: 'John', lastName: 'Doe', email: 'john.doe@test.fr' })
        console.log(res.body)
      })
  })
});
