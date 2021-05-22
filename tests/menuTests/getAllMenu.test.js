const setup = require('../test-helper');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

const url = '/restaurants';
const newRestaurant = {
  name: `Pizz'Burger`,
  description: `Pizz'burger c'est des pizzas, mais pas que, c'est aussi des burgers, des tacos, et des kebabs...`,
};

const newMenu = {
  category: 'Midi'
}

describe('Get all menu', function() {
  setup()
  it('Return list of menu', async() => {
    const postRestaurant = await request(app).post(url)
      .send(newRestaurant)
    await request(app).post(url+`/${postRestaurant.body._id}/menu`)
      .send(newMenu)
    const res = await request(app).get(url+`/${postRestaurant.body._id}/menu`)
    expect(res.statusCode).to.equal(200)
  });

  it('Return list of menu', async() => {
    const postRestaurant = await request(app).post(url)
      .send(newRestaurant)
    await request(app).post(url+`/${postRestaurant.body._id}/menu`)
      .send(newMenu)
    const res = await request(app).get(url+`/${postRestaurant.body._id}/menu`)
    expect(res.body).to.be.instanceOf(Array)
  });
})