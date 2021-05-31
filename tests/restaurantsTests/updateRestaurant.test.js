const setup = require('../test-helper');
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../app');

const newRestaurant = {
  name: `Pizz'Burger`,
  description: `Pizz'burger c'est des pizzas, mais pas que, c'est aussi des burgers, des tacos, et des kebabs...`,
};

const updateRestaurant = {
  description: `This is the new description`
}

const url = "/restaurants"

describe('Update restaurants tests', function() {
  setup();
  it('Return status code 201', async() => {
    const postRestaurant = await request(app).post(url)
      .send(newRestaurant)
    const res = await request(app).put(url+`/${postRestaurant.body._id}`)
      .send(updateRestaurant)
    expect(res.statusCode).to.equal(201)
  })

  it('Return new description', async() => {
    const postRestaurant = await request(app).post(url)
      .send(newRestaurant)
    const res = await request(app).put(url+`/${postRestaurant.body._id}`)
      .send(updateRestaurant)
    expect(res.body).has.property('msg', 'Restaurant has been updated')
  })
})