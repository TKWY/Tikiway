const request = require('supertest');
const expect = require('chai').expect;
const conn = require('../src/db/index');
const app = require('../app');
const Customer = require('../src/db/models/customerModels');

const url = '/customers/signin'
const userLogin = { username: 'john.doe@mail.fr', password: 'test'}
const newUser = {
  firstName: 'John',
  lastName: 'DOE',
  phone: '+68987705645',
  password: 'test',
  email: 'john.doe@mail.fr'
}

describe('Sign In Test', function () {
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

  it('POST empty username return 401', async() => {
    const newCustomer = new Customer(newUser);
    await newCustomer.save()
    const res = await request(app).post(url)
      .send({username: '', password:''});
    expect(res.statusCode).to.equal(401);
    expect(res.body).has.property('code', 401);
    expect(res.body).has.property('success', false);
    expect(res.body).has.property('msg', 'Please enter your phone number or email address!');
  })

  it('POST empty password return 401', async() => {
    const newCustomer = new Customer(newUser);
    await newCustomer.save()
    const res = await request(app).post(url)
      .send({username: 'test', password: ''});
    expect(res.statusCode).to.equal(401);
    expect(res.body).has.property('code', 401);
    expect(res.body).has.property('success', false);
    expect(res.body).has.property('msg', 'Please enter your password!');
  })

  it('POST false username return 403', async() => {
    const newCustomer = new Customer(newUser);
    await newCustomer.save()
    const res = await request(app).post(url)
      .send({username: 'john.doe@mail.com', password: 'test'});
    expect(res.statusCode).to.equal(403);
    expect(res.body).has.property('code', 403);
    expect(res.body).has.property('success', false);
    expect(res.body).has.property('msg', 'That user does not exist!')
  })

  it('POST false password return 403', async() => {
    const newCustomer = new Customer(newUser);
    await newCustomer.save()
    const res = await request(app).post(url)
      .send({username: 'john.doe@mail.fr', password: 'false'})
    expect(res.statusCode).to.equal(403);
    expect(res.body).has.property('code', 403);
    expect(res.body).has.property('success', false);
    expect(res.body).has.property('msg', 'Wrong password, please try again.')
  })

  it('POST user return 200', async() => {
    const newCustomer = new Customer(newUser);
    await newCustomer.save()
    const res = await request(app).post(url)
      .send(userLogin)
    expect(res.statusCode).to.equal(200);
    expect(res.body).has.property('code', 200);
    expect(res.body).has.property('success', true);
    expect(res.body).has.property('token');
    expect(res.body).to.not.have.property('user');
    expect(res.body).to.not.have.deep.property('firstName');
    expect(res.body).to.not.have.deep.property('lastName');
    expect(res.body).to.not.have.deep.property('password');
  })
});
