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

describe('Post new Menu', function() {
  setup();
  it('Return status code 200', async() => {
    const postRestaurant = await request(app).post(url)
      .send(newRestaurant)
    const res = await request(app).post(url+`/${postRestaurant.body._id}/menu`)
      .send(newMenu)
    expect(res.statusCode).is.equal(200);
  })

  it('Return menu with category property', async() => {
    const postRestaurant = await request(app).post(url)
      .send(newRestaurant)
    const res = await request(app).post(url+`/${postRestaurant.body._id}/menu`)
      .send(newMenu)
    expect(res.body).has.property('category', 'Midi')
  })
})