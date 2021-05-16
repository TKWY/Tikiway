const expect = require('chai').expect;
const app = require('../../app');
const request = require('supertest');
const setup = require('../test-helper');

const url = '/customers/'
const newUser = {
  firstName: 'John',
  lastName: 'Doe',
  phone: '+68987705645',
  password: 'test',
  email: 'john.doe@mail.fr'
}

describe('Create customer account test', function () {
  setup()
  it('Post return status code 200', async () => {
    const res = await request(app).post(url)
      .send(newUser)
    expect(res.statusCode).to.equal(200);
    expect(res.body).has.property('msg', `Welcome to Tikiway ${newUser.firstName}, thank you for joining us.`)
  });

  it('Response has property code and return 200', async () => {
    const res = await request(app).post(url)
      .send(newUser)
    expect(res.body).has.property('code', 200);
  });

  it('Response has property success and return true', async () => {
    const res = await request(app).post(url)
      .send(newUser)
    expect(res.body).has.property('success', true);
  });

  it('Response has property msg and return thank you message', async () => {
    const res = await request(app).post(url)
      .send(newUser)
    expect(res.body).has.property('msg', `Welcome to Tikiway ${newUser.firstName}, thank you for joining us.`)
  });
});
