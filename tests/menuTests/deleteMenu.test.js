const setup = require('../test-helper');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

const url = '/api/restaurants';
const newRestaurant = {
  name: `Pizz'Burger`,
  description: `Pizz'burger c'est des pizzas, mais pas que, c'est aussi des burgers, des tacos, et des kebabs...`,
};

const newMenu = {
  category: 'Midi'
};

describe('Delete Menu', function() {
  setup();
  it('Return status code 204', async() => {
    const postRestaurant = await request(app).post(url)
      .send(newRestaurant);
    const postMenu = await request(app).post(url+`/${postRestaurant.body._id}/menu`)
      .send(newMenu);
    const res = await request(app).delete(url+`/${postRestaurant.body._id}/menu`+`/${postMenu.body._id}`);
    expect(res.statusCode).to.equal(204);
  });

  it('Return status code 204', async() => {
    const postRestaurant = await request(app).post(url)
      .send(newRestaurant);
    const postMenu = await request(app).post(url+`/${postRestaurant.body._id}/menu`)
      .send(newMenu);
    const res = await request(app).delete(url+`/${postRestaurant.body._id}/menu`+`/${postMenu.body._id}`);
    expect(res.noContent).to.equal(true);
  })
})