const request = require('supertest');
const expect = require('chai').expect;
const setup = require('../test-helper');
const app = require('../../app');
const Customer = require('../../src/db/models/customerModels')

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
  setup()
  it('update user return "not logged in" error' , async() => {
    await request(app).post('/customers/signup')
      .send(newUser)
      
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
    await request(app).post('/customers/signup')
      .send(newUser)

    await request(app).post('/customers/signin')
      .send(userLogin)
      .then(async (result) => {
        const id = result.body.id
        const Cookies = result.headers['set-cookie'].map(function(r){
          return r.replace("; path=/; httponly","")}).join("; ");
        const res = await request(app).put(`/customers/${id}`)
          .set('Cookie', Cookies)
          .send(updateUser)
        expect(res.statusCode).to.equal(200);
        expect(res.body).has.property('code', 200)
      })
  })
});
