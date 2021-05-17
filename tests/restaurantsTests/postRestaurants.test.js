const setup = require('../test-helper');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

const url = '/restaurants';
const newRestaurant = {
  name: `Pizz'Burger`,
  description: `Pizz'burger c'est des pizzas, mais pas que, c'est aussi des burgers, des tacos, et des kebabs...`,
  rating: 1
}

describe('Post new restaurant', function() {
  setup();
  it('return status code 200', async() => {
    const res = await request(app).post(url)
      .send(newRestaurant)
    expect(res.statusCode).to.equal(200)
  });

  it('has property name', async() => {
    const res = await request(app).post(url)
      .send(newRestaurant)
    expect(res.body).has.property('name', `Pizz'Burger`)
  });

  it('status is ok', async() => {
    const res = await request(app).post(url)
      .send(newRestaurant)
    expect(res).has.property('ok', true)
  })

  it('has property description', async() => {
    const res = await request(app).post(url)
      .send(newRestaurant)
    expect(res.body).has.property('description', `Pizz'burger c'est des pizzas, mais pas que, c'est aussi des burgers, des tacos, et des kebabs...`)
  });

  it('has property rating', async() => {
    const res = await request(app).post(url)
      .send(newRestaurant)
    expect(res.body).has.property('rating')
  })
})