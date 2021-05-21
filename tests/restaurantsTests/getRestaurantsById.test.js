const setup = require('../test-helper');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

const url = '/restaurants';
const newRestaurant = {
  name: `Pizz'Burger`,
  description: `Pizz'burger c'est des pizzas, mais pas que, c'est aussi des burgers, des tacos, et des kebabs...`,
};

describe('Get restaurant by id', function() {
  setup()
  it('Return status code 200', async() => {
    const postRestaurant = await request(app).post(url)
      .send(newRestaurant)
    const res = await request(app).get(url+`/${postRestaurant.body._id}`)
    expect(res.statusCode).to.equal(200)
  });

  it('Return restaurant name', async() => {
    const postRestaurant = await request(app).post(url)
      .send(newRestaurant)
    const res = await request(app).get(url+`/${postRestaurant.body._id}`)
    expect(res.body).has.property('name', `Pizz'Burger`)
  });

  it('Return restaurant description', async() => {
    const postRestaurant = await request(app).post(url)
      .send(newRestaurant)
    const res = await request(app).get(url+`/${postRestaurant.body._id}`)
    expect(res.body).has.property('description', `Pizz'burger c'est des pizzas, mais pas que, c'est aussi des burgers, des tacos, et des kebabs...`)
  });

  it('Return status code 404 restaurant does not exist', async() => {
    const res = await request(app).get(url+'/1')
    expect(res.statusCode).to.equal(404)
    expect(res.statusCode).to.not.equal(200)
  });
})