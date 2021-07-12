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

describe('Create customer tests', function () {
  setup()
  it('Post return status code 201', async () => {
    const res = await request(app).post(url)
      .send(newUser)
    expect(res.statusCode).to.equal(201);

  });

  it('Response has property msg and return thank you message', async () => {
    const res = await request(app).post(url)
      .send(newUser)
    expect(res.body).to.equal(`Welcome to Tikiway ${newUser.firstName} ${newUser.lastName}, thank you for joining us.`)
  });
});
