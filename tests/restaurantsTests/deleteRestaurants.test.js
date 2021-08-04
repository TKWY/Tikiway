const setup = require('../test-helper');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

const url = '/api/restaurants';
const newRestaurant = {
  name: `Pizz'Burger`,
  description: `Pizz'burger c'est des pizzas, mais pas que, c'est aussi des burgers, des tacos, et des kebabs...`,
};


describe('Delete restaurants', function() {
  setup();
  it('Delete restaurant', async() => {
    const postRestaurant = await request(app).post(url)
      .send(newRestaurant)
    const res = await request(app).delete(url+`/${postRestaurant.body._id}`)
    expect(res.statusCode).to.equal(204)
  })
})